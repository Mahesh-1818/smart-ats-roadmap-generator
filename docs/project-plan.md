# Smart ATS + Career Roadmap Generator

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT
* bcryptjs

### AI

* Gemini API

---

# System Architecture

Frontend (React)
↓
Backend (Node.js + Express)
↓
MongoDB
↓
Gemini API

---

# Folder Structure

## Frontend

frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ ├── hooks/
│ ├── context/
│ ├── utils/
│ └── App.jsx

## Backend

backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── uploads/
├── utils/
├── .env
└── server.js

---

# Core Features

1. User Registration
2. User Login
3. Resume PDF Upload
4. Resume Parsing
5. ATS Score Generation
6. Skill Extraction
7. Missing Skill Analysis
8. Career Roadmap Generation
9. Dashboard
10. Resume History

---

# Collections

## Users

* name
* email
* password
* createdAt

## Resumes

* userId
* fileName
* parsedText
* extractedSkills
* atsScore
* status
* createdAt

## Roadmaps

* resumeId
* targetRole
* missingSkills
* roadmapPhases
* createdAt

---

# API Endpoints

## Auth

POST /api/auth/register

POST /api/auth/login

GET /api/auth/me

---

## Resume

POST /api/resumes/upload

GET /api/resumes

GET /api/resumes/:id

DELETE /api/resumes/:id

---

## ATS

POST /api/ats/analyze

GET /api/ats/:id

---

## Roadmap

POST /api/roadmap/generate

GET /api/roadmap/:id

---

## Dashboard

GET /api/dashboard/stats

---

# Gemini Workflow

Step 1:
Resume Parsing

Step 2:
ATS Score Generation

Step 3:
Skill Gap Analysis

Step 4:
Career Roadmap Generation

---

# Backend Packages

* express
* mongoose
* jsonwebtoken
* bcryptjs
* multer
* pdf-parse
* @google/generative-ai
* cors
* dotenv
* helmet
* express-rate-limit

---

# Frontend Packages

* axios
* react-router-dom
* react-hook-form
* react-dropzone
* react-hot-toast
* recharts
* lucide-react

---

# Security

* Password Hashing (bcrypt)
* JWT Authentication
* Protected Routes
* Helmet Security Headers
* Rate Limiting
* File Type Validation
* Environment Variables

---

# Development Order

Phase 1:
Database Design

Phase 2:
Authentication Module

Phase 3:
Resume Upload Module

Phase 4:
Resume Parsing

Phase 5:
ATS Analysis

Phase 6:
Gemini Integration

Phase 7:
Dashboard

Phase 8:
Deployment
