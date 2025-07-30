import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type MessageBubbleProps = {
  text: string;
  isUser: boolean;
};

const MessageBubble = ({ text, isUser }: MessageBubbleProps) => {
  return (
    <div
      className={`w-full flex mb-3 px-30 ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`
          ${isUser ? 'bg-gray-100 text-gray-900 rounded-2xl shadow-md' : ' text-gray-900'}
          ${isUser ? 'max-w-[60%]' : 'max-w-full'}
          ${isUser ? 'w-fit' : 'w-full'}
          px-4 py-2
          whitespace-pre-wrap break-words
        `}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={materialDark}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    background: '#2d2d2d',
                    fontSize: '0.875rem',
                    overflowX: 'auto',
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className="bg-gray-200 text-red-500 px-1 py-0.5 rounded" {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MessageBubble;
