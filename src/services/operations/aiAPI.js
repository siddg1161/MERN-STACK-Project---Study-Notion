import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { aiEndpoints } from "../apis";

const {
  ASK_DOUBT_API,
  GENERATE_SUMMARY_API,
  GENERATE_QUIZ_API,
} = aiEndpoints;

// ================================
// Ask AI Doubt
// ================================
export const askAIDoubt = async (
  token,
  courseId,
  subSectionId,
  question
) => {
  let result = null;

  const toastId = toast.loading("StudyBuddy is thinking...");

  try {
    const response = await apiConnector(
      "POST",
      ASK_DOUBT_API,
      {
        courseId,
        subSectionId,
        question,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data.data.response;
  } catch (error) {
    console.log("ASK AI ERROR:", error);

    toast.error("Unable to generate answer.");
  }

  toast.dismiss(toastId);

  return result;
};

// ================================
// Generate Summary
// ================================
export const generateSummary = async (
  token,
  courseId,
  subSectionId
) => {
  let result = null;

  const toastId = toast.loading("Generating summary...");

  try {
    const response = await apiConnector(
      "POST",
      GENERATE_SUMMARY_API,
      {
        courseId,
        subSectionId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data.data.response;
  } catch (error) {
    console.log("SUMMARY ERROR:", error);

    toast.error("Unable to generate summary.");
  }

  toast.dismiss(toastId);

  return result;
};

// ================================
// Generate Quiz
// ================================
export const generateQuiz = async (
  token,
  courseId,
  subSectionId
) => {
  let result = null;

  const toastId = toast.loading("Generating quiz...");

  try {
    const response = await apiConnector(
      "POST",
      GENERATE_QUIZ_API,
      {
        courseId,
        subSectionId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data.data.response;
  } catch (error) {
    console.log("QUIZ ERROR:", error);

    toast.error("Unable to generate quiz.");
  }

  toast.dismiss(toastId);

  return result;
};