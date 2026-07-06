import {
  FiMessageCircle,
  FiBookOpen,
  FiHelpCircle,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <FiMessageCircle size={28} />,
    title: "AI Doubt Solver",
    description:
      "Ask questions about any lecture and receive beginner-friendly explanations instantly.",
  },
  {
    icon: <FiBookOpen size={28} />,
    title: "Smart Summaries",
    description:
      "Generate concise revision notes and key concepts for every lecture.",
  },
  {
    icon: <FiHelpCircle size={28} />,
    title: "Interactive Quiz",
    description:
      "Practice with AI-generated quizzes and reinforce your understanding.",
  },
];

const StudyBuddyAISection = () => {
  return (
    <section className="mx-auto mt-32 w-11/12 max-w-maxContent">

      <div className="rounded-3xl border border-richblack-700 bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900 p-10 shadow-2xl">

        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-5 inline-flex rounded-full bg-yellow-50 px-5 py-2 font-semibold text-richblack-900">
            🤖 StudyBuddy AI
          </div>

          <h2 className="text-4xl font-bold text-richblack-5">
            Learn Smarter with AI
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-richblack-300">
            AI-powered learning tools that help you understand concepts,
            revise quickly, and test your knowledge without leaving your course.
          </p>

        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="rounded-2xl border border-richblack-700 bg-richblack-800 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-50 hover:shadow-xl"
            >

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-50 text-richblack-900">

                {feature.icon}

              </div>

              <h3 className="text-xl font-semibold text-richblack-5">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-richblack-300">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

        <div className="mt-14 flex justify-center">

          <Link
            to="/catalog/python" className="flex items-center gap-2 rounded-xl bg-yellow-50 px-8 py-4 font-semibold text-richblack-900 transition-all duration-300 hover:scale-105"
           >
              Explore Courses
              <FiArrowRight />
          </Link>

        </div>

      </div>

    </section>
  );
};

export default StudyBuddyAISection;