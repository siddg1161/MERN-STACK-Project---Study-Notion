import { useState } from "react";
import { useSelector } from "react-redux";
import { FiHelpCircle, FiLoader } from "react-icons/fi";

import { generateQuiz } from "../../../services/operations/aiAPI";

const QuizPanel = ({ courseId, subSectionId }) => {

    const { token } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);

    const [quiz, setQuiz] = useState([]);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [selectedOption, setSelectedOption] = useState(null);

    const [showAnswer, setShowAnswer] = useState(false);

    const [score, setScore] = useState(0);

    const [quizFinished, setQuizFinished] = useState(false);

    const generateAIQuiz = async () => {

        setLoading(true);

        const res = await generateQuiz(
            token,
            courseId,
            subSectionId
        );

        if(res){
            setQuiz(res);
            setCurrentQuestion(0);
            setSelectedOption(null);
            setShowAnswer(false);
            setScore(0);
            setQuizFinished(false);
        }

        setLoading(false);
    };

    const handleSubmit = () => {

        if(selectedOption === null) return;

        setShowAnswer(true);

        if(
            selectedOption ===
            quiz[currentQuestion].correctAnswer
        ){
            setScore((prev)=>prev+1);
        }
    };

    const handleNext = () => {

        if(currentQuestion === quiz.length-1){

            setQuizFinished(true);

            return;
        }

        setCurrentQuestion((prev)=>prev+1);

        setSelectedOption(null);

        setShowAnswer(false);

    };
        if (loading) {
        return (
            <div className="flex h-[350px] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <FiLoader
                        className="animate-spin text-yellow-50"
                        size={40}
                    />
                    <p className="text-richblack-300">
                        Generating AI Quiz...
                    </p>
                </div>
            </div>
        );
    }

    if (quizFinished) {
        return (
            <div className="rounded-2xl border border-richblack-700 bg-richblack-900 p-8 text-center">

                <h2 className="text-3xl font-bold text-richblack-5">
                    🎉 Quiz Completed
                </h2>

                <p className="mt-4 text-5xl font-bold text-yellow-50">
                    {score} / {quiz.length}
                </p>

                <p className="mt-3 text-richblack-300">
                    {score === quiz.length
                        ? "Perfect Score! 🚀"
                        : score >= quiz.length / 2
                        ? "Great Job! 👏"
                        : "Keep Practicing 💪"}
                </p>

                <button
                    onClick={generateAIQuiz}
                    className="mt-8 rounded-xl bg-yellow-50 px-6 py-3 font-semibold text-richblack-900 transition-all hover:scale-105"
                >
                    Retry Quiz
                </button>

            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="flex items-center gap-2 text-2xl font-bold text-richblack-5">
                        <FiHelpCircle className="text-yellow-50" />
                        Interactive Quiz
                    </h2>

                    <p className="mt-2 text-richblack-300">
                        Test your understanding of this lecture.
                    </p>

                </div>

                {!quiz.length && (
                    <button
                        onClick={generateAIQuiz}
                        className="rounded-xl bg-yellow-50 px-5 py-3 font-semibold text-richblack-900 transition-all hover:scale-105"
                    >
                        Generate Quiz
                    </button>
                )}

            </div>

            {quiz.length > 0 && (

                <>

                    {/* Progress */}

                    <div>

                        <div className="mb-2 flex justify-between text-sm text-richblack-300">
                            <span>
                                Question {currentQuestion + 1} / {quiz.length}
                            </span>

                            <span>
                                Score : {score}
                            </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-richblack-700">

                            <div
                                className="h-full bg-yellow-50 transition-all duration-500"
                                style={{
                                    width: `${((currentQuestion + 1) / quiz.length) * 100}%`,
                                }}
                            />

                        </div>

                    </div>

                    {/* Question */}

                    <div className="rounded-2xl border border-richblack-700 bg-richblack-900 p-6">

                        <h3 className="text-xl font-semibold text-richblack-5">
                            {quiz[currentQuestion].question}
                        </h3>

                        <div className="mt-6 space-y-4">
                             {quiz[currentQuestion].options.map((option, index) => {

    let bg = "bg-richblack-800";
    let border = "border-richblack-700";

    if (showAnswer) {

        if (index === quiz[currentQuestion].correctAnswer) {
            bg = "bg-green-900/40";
            border = "border-green-500";
        }

        else if (
            index === selectedOption &&
            selectedOption !== quiz[currentQuestion].correctAnswer
        ) {
            bg = "bg-red-900/40";
            border = "border-red-500";
        }

    }

    else if (selectedOption === index) {
        bg = "bg-yellow-900/40";
        border = "border-yellow-400";
    }

    return (

        <button
            key={index}
            disabled={showAnswer}
            onClick={() => setSelectedOption(index)}
            className={`w-full rounded-xl border ${border} p-4 text-left transition-all duration-300 hover:scale-[1.02] ${bg}`}
        >

            <div className="flex items-center justify-between">

                <span>

                    <span className="font-semibold">
                        {String.fromCharCode(65 + index)}.
                    </span>{" "}

                    {option}

                </span>

                {showAnswer &&
                    index === quiz[currentQuestion].correctAnswer && (

                        <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
                            ✓ Correct
                        </span>

                    )}

                {showAnswer &&
                    index === selectedOption &&
                    selectedOption !==
                        quiz[currentQuestion].correctAnswer && (

                        <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                            Your Choice
                        </span>

                    )}

            </div>

        </button>

    );

})}
                        </div>

                        {showAnswer && (

<div className="mt-6 space-y-4">

    {selectedOption === quiz[currentQuestion].correctAnswer ? (

        <div className="rounded-xl border border-green-500 bg-green-900/30 p-4">

            <h4 className="text-lg font-bold text-green-400">
                ✅ Correct!
            </h4>

            <p className="mt-2 text-richblack-100">
                Excellent! You selected the correct answer.
            </p>

        </div>

    ) : (

        <div className="rounded-xl border border-red-500 bg-red-900/30 p-4">

            <h4 className="text-lg font-bold text-red-400">
                ❌ Incorrect
            </h4>

            <p className="mt-2">

                Correct Answer :

                <span className="ml-2 font-bold text-green-400">

                    {String.fromCharCode(
                        65 +
                        quiz[currentQuestion].correctAnswer
                    )}

                    .{" "}

                    {
                        quiz[currentQuestion].options[
                            quiz[currentQuestion].correctAnswer
                        ]
                    }

                </span>

            </p>

        </div>

    )}

    <div className="rounded-xl bg-richblack-800 p-5">

        <h4 className="font-semibold text-yellow-50">
            💡 Explanation
        </h4>

        <p className="mt-2 text-richblack-200">
            {quiz[currentQuestion].explanation}
        </p>

    </div>

</div>

)}

                        <div className="mt-8 flex justify-end">

                            {!showAnswer ? (

                                <button
                                    onClick={handleSubmit}
                                    disabled={selectedOption === null}
                                    className="rounded-xl bg-yellow-50 px-6 py-3 font-semibold text-richblack-900 disabled:opacity-40"
                                >
                                    Submit
                                </button>

                            ) : (

                                <button
                                    onClick={handleNext}
                                    className="rounded-xl bg-yellow-50 px-6 py-3 font-semibold text-richblack-900"
                                >
                                    {currentQuestion === quiz.length - 1
                                        ? "Finish Quiz"
                                        : "Next Question"}
                                </button>

                            )}

                        </div>

                    </div>

                </>

            )}

        </div>
    );
};

export default QuizPanel;