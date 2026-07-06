import { useState } from "react";
import { useSelector } from "react-redux";
import { FiBookOpen, FiLoader } from "react-icons/fi";

import AIResponse from "./AIResponse";
import { generateSummary } from "../../../services/operations/aiAPI";

const SummaryPanel = ({ courseId, subSectionId }) => {
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const handleGenerateSummary = async () => {
    setLoading(true);

    const res = await generateSummary(
      token,
      courseId,
      subSectionId
    );

    if (res) {
      setSummary(res);
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6">

      {/* Heading */}
      <div>
        <h2 className="flex items-center gap-2 text-2xl font-bold text-richblack-5">
          <FiBookOpen className="text-yellow-50" />
          Smart Summary
        </h2>

        <p className="mt-2 text-richblack-300">
          Generate AI-powered revision notes for this lecture.
        </p>
      </div>

      {/* Summary Card */}
      <div className="rounded-2xl border border-richblack-700 bg-richblack-900 p-6">

        <div className="flex flex-col items-center justify-center py-10">

          <div className="mb-4 rounded-full bg-richblack-800 p-5">
            <FiBookOpen
              size={42}
              className="text-yellow-50"
            />
          </div>

          <h3 className="text-xl font-semibold text-richblack-5">
            AI Lecture Summary
          </h3>

          <p className="mt-2 max-w-lg text-center text-richblack-300">
            Instantly generate concise notes, important concepts,
            interview questions and revision points.
          </p>

          <button
            disabled={loading}
            onClick={handleGenerateSummary}
            className="mt-8 flex items-center gap-2 rounded-xl bg-yellow-50 px-6 py-3 font-semibold text-richblack-900 transition-all duration-300 hover:scale-105 hover:bg-yellow-100 disabled:opacity-60"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FiBookOpen />
                Generate Summary
              </>
            )}
          </button>

        </div>

      </div>

      {/* Response */}

      {summary && (
        <AIResponse response={summary} />
      )}

    </div>
  );
};

export default SummaryPanel;