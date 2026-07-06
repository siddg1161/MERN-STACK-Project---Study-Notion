# 🎓 StudyNotion

> **A Full-Stack AI-Powered Learning Management System (LMS) built with the MERN Stack.**

🚀 **Live Demo:** https://mern-stack-project-study-notion-fro.vercel.app/

---

## 📖 Overview

StudyNotion is a full-stack Learning Management System (LMS) where instructors can create and manage courses while students can purchase, enroll, and track their learning progress.

The platform now includes **AI-powered learning assistance** using **Google Gemini**, allowing students to:

- 🤖 Ask doubts about a lecture
- 📖 Generate lecture summaries
- ❓ Practice with AI-generated quizzes

---

# ✨ Features

## 👨‍🎓 Student Features

- Secure Authentication (JWT)
- Browse & Purchase Courses
- Razorpay Payment Integration
- Course Progress Tracking
- Watch Video Lectures
- Profile Management
- Ratings & Reviews

### 🤖 AI Learning Assistant

- 💬 AI Doubt Solver
- 📖 AI Lecture Summary Generator
- ❓ AI Interactive Quiz Generator
- Lecture-specific AI Responses using Gemini

---

## 👨‍🏫 Instructor Features

- Instructor Dashboard
- Create Courses
- Edit Courses
- Upload Thumbnails
- Upload Lecture Videos
- Create Sections & Subsections
- Revenue Dashboard
- Student Analytics

---

## 🔐 Authentication

- JWT Authentication
- Login / Signup
- Forgot Password
- OTP Verification
- Role-based Authorization
- Protected Routes

---

## 💳 Payments

- Razorpay Integration
- Secure Checkout
- Purchase Verification
- Enrollment after Payment

---

## 📩 Notifications

- Enrollment Emails
- Purchase Confirmation
- OTP Emails
- Password Reset Emails

---

# 🛠 Tech Stack

### Frontend

- React.js
- Redux Toolkit
- Tailwind CSS
- React Router
- React Icons
- React Markdown

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt

### APIs & Services

- Google Gemini AI
- Razorpay
- Cloudinary
- Nodemailer

### Deployment

- Vercel
- Render
- MongoDB Atlas

---

# 🤖 AI Features

StudyNotion now includes an AI-powered learning assistant.

### 💬 Ask Doubts

Students can ask questions related to any lecture and receive AI-generated explanations.

---

### 📖 Smart Summary

Generate concise summaries of lectures for quick revision.

---

### ❓ Interactive Quiz

Generate AI-powered quizzes based on lecture content with:

- Multiple Choice Questions
- Instant Feedback
- Score Tracking
- Answer Explanations

---

# 📷 Project Screenshots

(Add your updated screenshots here)

### 🏠 Home Page

<img ...>

### 📚 Course Player

<img ...>

### 🤖 StudyBuddy AI

<img ...>

### 👨‍🏫 Instructor Dashboard

<img ...>

### 👨‍🎓 Student Dashboard

<img ...>

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/siddg1161/MERN-STACK-Project---Study-Notion.git
```

Install dependencies

### Frontend

```bash
npm install
npm start
```

### Backend

```bash
cd Server
npm install
npm start
```

---

# 🔑 Environment Variables

### Backend (.env)

```env
PORT=
MONGODB_URL=

JWT_SECRET=

MAIL_HOST=
MAIL_USER=
MAIL_PASS=

CLOUD_NAME=
API_KEY=
API_SECRET=
FOLDER_NAME=

RAZORPAY_KEY=
RAZORPAY_SECRET=

GEMINI_API_KEY=
```

---

# 📌 Important

- Backend code is inside the `Server` folder.
- Create course categories before creating courses.
- To create an Admin account:
  - Register as Student/Instructor.
  - Change `accountType` to `Admin` in MongoDB.

---

# 🚀 Future Enhancements

- AI Flashcards
- AI Study Planner
- Learning Analytics
- Voice-based AI Assistant
- Certificate Generation

---

# 👨‍💻 Author

**Siddharth Gupta**

GitHub: https://github.com/siddg1161

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
