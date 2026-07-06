const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");

const {
  askDoubt,
  generateSummary,
  generateQuiz,
} = require("../controllers/AIController");

// ================================
// AI Routes
// ================================

// Ask AI Doubt
router.post("/ask", askDoubt);

// Generate Lecture Summary
router.post("/summary", generateSummary);

// Generate Quiz
router.post("/quiz", generateQuiz);

module.exports = router;