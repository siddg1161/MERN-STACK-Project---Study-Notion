const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Gemini Model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// Generate AI Response
const generateResponse = async (prompt) => {
  try {
    if (!prompt) {
      throw new Error("Prompt is required.");
    }

    const result = await model.generateContent(prompt);

    if (!result || !result.response) {
      throw new Error("No response received from Gemini.");
    }

    const response = result.response.text();

    return response;
  } catch (error) {
    console.error("Gemini Service Error:", error);

    throw new Error(error.message || "Failed to generate AI response.");
  }
};

module.exports = {
  generateResponse,
};