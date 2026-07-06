import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import {
  FiCopy,
  FiCheck,
  FiThumbsUp,
  FiThumbsDown,
  FiCpu,
} from "react-icons/fi";

const AIResponse = ({ response }) => {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null);

  if (!response) return null;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(response);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-richblack-700 bg-richblack-800 shadow-2xl animate-fadeIn">

      {/* Header */}

      <div className="border-b border-richblack-700 bg-gradient-to-r from-richblack-900 via-richblack-800 to-richblack-900 px-6 py-5">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50 text-richblack-900 shadow-lg">

              <FiCpu size={24} />

            </div>

            <div>

              <h2 className="text-xl font-bold text-richblack-5">
                StudyBuddy AI
              </h2>

              <p className="text-sm text-richblack-300">
                Powered by Gemini 2.5 Flash
              </p>

            </div>

          </div>

          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 rounded-xl bg-richblack-700 px-4 py-2 transition-all duration-300 hover:bg-richblack-600 hover:scale-105"
          >
            {copied ? (
              <>
                <FiCheck className="text-green-400" />
                <span className="text-green-400 font-semibold">
                  Copied
                </span>
              </>
            ) : (
              <>
                <FiCopy />
                Copy Response
              </>
            )}
          </button>

        </div>

      </div>

      {/* Response */}

      <div className="p-8">

        <div className="prose prose-invert max-w-none prose-headings:text-yellow-50 prose-p:text-richblack-100 prose-strong:text-yellow-50 prose-li:text-richblack-100">

          <ReactMarkdown
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");

                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      borderRadius: "16px",
                      padding: "20px",
                      fontSize: "15px",
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className="rounded-lg bg-richblack-900 px-2 py-1 text-yellow-50"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {response}
          </ReactMarkdown>

        </div>

      </div>

      {/* Footer */}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-richblack-700 bg-richblack-900 px-6 py-4">

        <div className="text-sm text-richblack-300">
          AI responses may occasionally make mistakes. Always verify important information.
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => setFeedback("up")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 transition-all duration-300 ${
              feedback === "up"
                ? "bg-green-600 text-white"
                : "bg-richblack-700 hover:bg-richblack-600"
            }`}
          >
            <FiThumbsUp />
            Helpful
          </button>

          <button
            onClick={() => setFeedback("down")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 transition-all duration-300 ${
              feedback === "down"
                ? "bg-red-600 text-white"
                : "bg-richblack-700 hover:bg-richblack-600"
            }`}
          >
            <FiThumbsDown />
            Not Helpful
          </button>

        </div>

      </div>

    </div>
  );
};

export default AIResponse;