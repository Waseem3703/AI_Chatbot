import axios from "axios";
import { useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { LiaSkullCrossbonesSolid } from "react-icons/lia";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { RiVoiceprintFill } from "react-icons/ri";
import { FaArrowAltCircleUp } from "react-icons/fa";
import MessageBubble from "./MessageBubble";
import { UserButton } from "@clerk/clerk-react";

function HeroSection() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<
    { message: string; sender: "user" | "ai" }[]
  >([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
 

  const GenerateAnswer = async (): Promise<void> => {
    if (!userInput.trim()) return;

    const userText = userInput;
    setMessages((prev) => [...prev, { message: userText, sender: "user" }]);
    setUserInput("");

    try {
      const response = await axios.post("http://localhost:5000/api/ai", {
        prompt: userText,
      });

      const text =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response";
      setMessages((prev) => [...prev, { message: text, sender: "ai" }]);
    } catch (err) {
      console.error("Error fetching AI response:", err);
    }
  };

  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  return (
    <section className="grid grid-cols-5 h-screen">
      {/* Sidebar */}
      <div className="bg-gray-500 p-4">
        <UserButton />
      </div>

      {/* Chat Section */}
      <div className="col-span-4 flex flex-col relative h-full p-4">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4">
          {messages.map((msg, idx) => (
            <MessageBubble
              key={idx}
              text={msg.message}
              isUser={msg.sender === "user"}
            />
          ))}
        </div>

        {/* Input Area */}
     {/* Input Area & Footer Together */}
<div className="w-full px-4 flex flex-col items-center mt-2">
  <div
    className="bg-white border shadow-md w-full max-w-3xl border-gray-300 px-4 py-2 rounded-4xl" 
  >
    <form
      onSubmit={(e) => {
        e.preventDefault();
        GenerateAnswer();
      }}
    >
      <textarea
        rows={1}
        ref={textareaRef}
        placeholder="Ask Anything"
        onInput={autoResize}
        className="w-full px-4 py-3 resize-none overflow-y-auto max-h-32 border-none rounded-xl text-gray-500 focus:text-gray-900 focus:outline-none"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            GenerateAnswer();
          }
        }}
      />
    </form>

    {/* Icons */}
    <div className="flex justify-between items-center mt-2">
      <div className="flex gap-2 items-center text-gray-500">
        <FiPlus size={22} />
        <LiaSkullCrossbonesSolid size={22} />
      </div>
      <div className="flex gap-2 items-center text-gray-500">
        <MdOutlineKeyboardVoice size={22} />
        <button onClick={GenerateAnswer}>
          {userInput.trim() === "" ? (
            <RiVoiceprintFill size={22} />
          ) : (
            <FaArrowAltCircleUp size={22} />
          )}
        </button>
      </div>
    </div>
  </div>

  {/* Footer Note */}
  <p className="text-xs text-gray-500 text-center mt-2">
    ChathaGPT can make mistakes. Check important info.
  </p>
</div></div>

    </section>
  );
}

export default HeroSection;
