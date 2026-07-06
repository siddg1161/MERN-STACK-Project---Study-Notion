import { useState } from "react";
import { FiMessageCircle, FiBookOpen, FiHelpCircle } from "react-icons/fi";

import AskDoubtPanel from "./AskDoubtPanel";
import SummaryPanel from "./SummaryPanel";
import QuizPanel from "./QuizPanel";

const tabs = [
  {
    id: "doubt",
    title: "Ask Doubt",
    icon: <FiMessageCircle size={18} />,
  },
  {
    id: "summary",
    title: "Summary",
    icon: <FiBookOpen size={18} />,
  },
  {
    id: "quiz",
    title: "Quiz",
    icon: <FiHelpCircle size={18} />,
  },
];

const StudyBuddyAI = ({ courseId, subSectionId }) => {
  const [activeTab, setActiveTab] = useState("doubt");

  return (
   <div className="mt-10 overflow-hidden rounded-3xl border border-richblack-700 bg-richblack-800 shadow-2xl">
      {/* Header */}

      <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-r from-richblack-900 via-richblack-800 to-richblack-900 border-b border-richblack-700">

    <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl"></div>

    <div className="relative px-8 py-8">

        <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-50 text-3xl shadow-lg">
                🤖
            </div>

            <div>

                <h1 className="text-3xl font-bold text-richblack-5">
                    StudyBuddy AI
                </h1>

                <p className="mt-1 text-richblack-300">
                    Your Personal AI Learning Companion
                </p>

            </div>

        </div>

        

    </div>

</div>

      {/* Tabs */}

<div className="flex flex-wrap gap-3 border-b border-richblack-700 bg-richblack-800 p-6">

  {tabs.map((tab) => (

    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
        activeTab === tab.id
          ? "bg-yellow-50 text-richblack-900 shadow-lg scale-105"
          : "bg-richblack-700 text-richblack-100 hover:bg-richblack-600 hover:scale-105"
      }`}
    >

      {tab.icon}

      {tab.title}

    </button>

  ))}

</div>

      {/* Body */}

      <div className="bg-richblack-900 p-8">

        {activeTab === "doubt" && (
          <AskDoubtPanel
            courseId={courseId}
            subSectionId={subSectionId}
          />
        )}

        {activeTab === "summary" && (
          <SummaryPanel
            courseId={courseId}
            subSectionId={subSectionId}
          />
        )}

        {activeTab === "quiz" && (
          <QuizPanel
            courseId={courseId}
            subSectionId={subSectionId}
          />
        )}

      </div>

    </div>
  );
};

export default StudyBuddyAI;