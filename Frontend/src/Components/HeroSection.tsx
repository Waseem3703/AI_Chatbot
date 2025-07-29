import axios from "axios";
import { useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { LiaSkullCrossbonesSolid } from "react-icons/lia";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { RiVoiceprintFill } from "react-icons/ri";
import { FaArrowAltCircleUp } from "react-icons/fa";

function HeroSection() {
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  async function GenerateAnswer() {
    const respone = await axios.post("http://localhost:5000/api/ai", {
      prompt: userInput,


    });
     const text = respone.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
     console.log(text)
 setMessage(text);
  }

  const autoResize = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  return (
    <section className="grid grid-cols-5 h-screen">
      {/* Left Sidebar */}
      <div className="bg-gray-500 p-4">{/* Sidebar content here */}</div>

      {/* Right Main Section */}
      <div className="col-span-4 bg-gray-200 flex flex-col justify-end items-center p-6">
        <p>{message}</p>
        {/* Input Container */}
        <div className="bg-white border shadow-md w-full max-w-2xl border-gray-400 px-4 py-3 rounded-3xl">
          <form className="w-full mb-2">
            <textarea
              rows={1}
              ref={textareaRef}
              placeholder="Ask Anything"
              onInput={autoResize}
              className="w-full px-4 py-3 resize-none overflow-y-auto max-h-32 border-none rounded-xl 
              focus:outline-none focus:ring-0 focus:border-none 
              hover:outline-none hover:ring-0 hover:border-none"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // prevent newline
                  GenerateAnswer(); // call your function
                }
              }}
            />
          </form>

          {/* Icons Section */}
          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-2 items-center text-gray-500">
              <FiPlus size={22} className="text-gray-600" />
              <LiaSkullCrossbonesSolid size={22} className="text-gray-600" />
            </div>
            <div className="flex gap-2 items-center text-gray-500">
              <MdOutlineKeyboardVoice size={22} className="text-gray-600" />

              <button>
                {userInput.trim() === "" ? (
                  <RiVoiceprintFill size={22} className="text-gray-600" />
                ) : (
                  <FaArrowAltCircleUp size={22} className="text-gray-800" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <p className="text-sm text-gray-600 mt-2 text-center">
          ChathaGPT can make mistakes. Check important info.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
