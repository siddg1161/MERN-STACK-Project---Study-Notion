import { useState } from "react";
import { useSelector } from "react-redux";
import {
  FiSend,
  FiLoader,
  FiCpu,
  FiMessageCircle,
} from "react-icons/fi";

import AIResponse from "./AIResponse";
import { askAIDoubt } from "../../../services/operations/aiAPI";

const suggestions = [
  "Explain this topic in simple words",
  "Give a real-world example",
  "What interview questions can be asked?",
  "Summarize this concept",
];

const AskDoubtPanel = ({ courseId, subSectionId }) => {
  const { token } = useSelector((state) => state.auth);

  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);

    const res = await askAIDoubt(
      token,
      courseId,
      subSectionId,
      question
    );

    if (res) {
      setResponse(res);
    }

    setLoading(false);
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-2xl border border-richblack-700 bg-gradient-to-r from-richblack-900 via-richblack-800 to-richblack-900 p-6">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-50 text-richblack-900 shadow-lg">

            <FiCpu size={26} />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-richblack-5">
              Ask StudyBuddy
            </h2>

            <p className="mt-1 text-richblack-300">
              Stuck on a lecture? Ask anything and receive an AI-powered explanation instantly.
            </p>

          </div>

        </div>

      </div>

      {/* Suggestions */}

      <div>

        <p className="mb-3 text-sm font-semibold text-richblack-300">
          Try asking
        </p>

        <div className="flex flex-wrap gap-3">

          {suggestions.map((item) => (

            <button
              key={item}
              onClick={() => setQuestion(item)}
              className="rounded-full border border-richblack-700 bg-richblack-800 px-4 py-2 text-sm text-richblack-100 transition-all duration-300 hover:border-yellow-50 hover:bg-richblack-700 hover:text-yellow-50"
            >
              {item}
            </button>

          ))}

        </div>

      </div>

      {/* Input */}

      <div className="rounded-3xl border border-richblack-700 bg-richblack-900 p-6 shadow-xl">

        <div className="mb-4 flex items-center gap-2 text-richblack-200">

          <FiMessageCircle />

          <span className="font-semibold">
            Your Question
          </span>

        </div>

        <textarea
          rows={6}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Example: Explain JWT Authentication in beginner-friendly language with a real-world example..."
          className="w-full resize-none rounded-xl bg-richblack-800 p-4 text-richblack-5 placeholder:text-richblack-400 focus:border-yellow-50 focus:outline-none"
        />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">

          <div>

            <p className="text-sm text-richblack-400">
              {question.length} characters
            </p>

            <p className="text-xs text-richblack-500">
              AI responses are generated using Gemini
            </p>

          </div>

          <button
            onClick={handleAsk}
            disabled={loading || !question.trim()}
            className="flex items-center gap-2 rounded-xl bg-yellow-50 px-6 py-3 font-semibold text-richblack-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-50"
          >

            {loading ? (
              <>
                <FiLoader className="animate-spin" />
                StudyBuddy is thinking...
              </>
            ) : (
              <>
                <FiSend />
                Ask StudyBuddy
              </>
            )}

          </button>

        </div>

      </div>

      {response && <AIResponse response={response} />}

    </div>
  );
};

export default AskDoubtPanel;