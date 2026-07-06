const Course = require("../models/Course");

const { generateResponse } = require("../services/aiService");

const {
  getDoubtPrompt,
  getSummaryPrompt,
  getQuizPrompt,
} = require("../utils/prompts");

// ============================================
// Helper Function
// ============================================

const getCourseAndLecture = async (courseId, subSectionId) => {
  const course = await Course.findById(courseId).populate({
    path: "courseContent",
    populate: {
      path: "subSection",
    },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  let lecture = null;

  for (const section of course.courseContent) {
    const foundLecture = section.subSection.find(
      (item) => item._id.toString() === subSectionId
    );

    if (foundLecture) {
      lecture = foundLecture;
      break;
    }
  }

  if (!lecture) {
    throw new Error("Lecture not found");
  }

  return { course, lecture };
};

// ============================================
// Ask Doubt
// ============================================

exports.askDoubt = async (req, res) => {
  try {
    const { courseId, subSectionId, question } = req.body;

    if (!courseId || !subSectionId || !question) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const { course, lecture } = await getCourseAndLecture(
      courseId,
      subSectionId
    );

    const prompt = getDoubtPrompt({
      courseName: course.courseName,
      lectureTitle: lecture.title,
      lectureDescription: lecture.description,
      question,
    });

    const aiResponse = await generateResponse(prompt);

    return res.status(200).json({
      success: true,
      data: {
        type: "doubt",
        response: aiResponse,
      },
    });
  } catch (error) {
    console.error("AI Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// Generate Summary
// ============================================

exports.generateSummary = async (req, res) => {
  try {
    const { courseId, subSectionId } = req.body;

    if (!courseId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "Course ID and SubSection ID are required",
      });
    }

    const { course, lecture } = await getCourseAndLecture(
      courseId,
      subSectionId
    );

    const prompt = getSummaryPrompt({
      courseName: course.courseName,
      lectureTitle: lecture.title,
      lectureDescription: lecture.description,
    });

    const aiResponse = await generateResponse(prompt);

    return res.status(200).json({
      success: true,
      data: {
        type: "summary",
        response: aiResponse,
      },
    });
  } catch (error) {
    console.error("AI Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// Generate Quiz
// ============================================

exports.generateQuiz = async (req, res) => {
  try {
    const { courseId, subSectionId } = req.body;

    if (!courseId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "Course ID and SubSection ID are required",
      });
    }

    const { course, lecture } = await getCourseAndLecture(
      courseId,
      subSectionId
    );

    const prompt = getQuizPrompt({
      courseName: course.courseName,
      lectureTitle: lecture.title,
      lectureDescription: lecture.description,
    });

    const aiResponse = await generateResponse(prompt);

let quizData;

  try {
   quizData = JSON.parse(aiResponse);
  } catch (err) {
  return res.status(500).json({
    success: false,
    message: "AI returned invalid quiz format.",
  });
  } 

  return res.status(200).json({
  success: true,
  data: {
    type: "quiz",
    response: quizData,
  },
  }); 
  } catch (error) {
    console.error("AI Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};