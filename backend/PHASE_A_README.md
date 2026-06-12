# Phase A: Backend Foundation - Implementation Guide

## 📋 Overview
Phase A establishes the core backend infrastructure including database models, JWT utilities, error handling, and validation layers. All components are production-ready and fully integrated.

---

## 📁 File Structure

### Models (Database Schemas)
```
backend/models/
├── User.js              ✅ User authentication & profile
├── Resume.js            ✅ Resume uploads & parsing data
├── Roadmap.js           ✅ Career roadmap generation & progress
└── index.js             ✅ Central export for all models
```

### Configuration
```
backend/config/
└── db.js                ✅ MongoDB connection with lifecycle handlers
```

### Utilities
```
backend/utils/
├── jwtUtils.js          ✅ JWT generation, verification, extraction
├── AppError.js          ✅ Standardized error class
├── validation.js        ✅ Input validation functions
├── logger.js            ✅ Centralized logging
└── generateToken.js     (Existing - can be removed in Phase B)
```

### Constants
```
backend/constants/
└── constants.js         ✅ Centralized config values
```

### Middleware
```
backend/middleware/
├── errorMiddleware.js   ✅ Global error handler (enhanced)
└── notFoundMiddleware.js (Existing)
```

### Root Files
```
backend/
├── server.js            ✅ Updated to use error middleware
├── package.json         ✅ All dependencies present
├── .env.example         ✅ Environment template
└── verify-phase-a.js    ✅ Comprehensive test suite
```

---

## 🔧 Installation & Setup

### 1. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
```

**Required Environment Variables:**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=smart_ats
NODE_ENV=development
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long_change_this
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key_here
```

### 2. Install Dependencies
```bash
npm install
```

**All required packages are already in package.json:**
- ✅ express - Web framework
- ✅ mongoose - MongoDB ODM
- ✅ jsonwebtoken - JWT token handling
- ✅ bcryptjs - Password hashing
- ✅ cors - Cross-origin requests
- ✅ helmet - Security headers
- ✅ dotenv - Environment configuration
- ✅ And more...

### 3. Verify Phase A Setup
```bash
npm run dev
# In another terminal:
node verify-phase-a.js
```

---

## 📊 Database Models Documentation

### User Model
**Location:** `backend/models/User.js`

**Fields:**
```javascript
{
  _id: ObjectId (auto-generated)
  name: String (required, 2-80 chars)
  email: String (required, unique, lowercase, valid format)
  passwordHash: String (required, bcrypt hash)
  role: String (enum: "user", "admin", default: "user")
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

**Indexes:**
- `email` (unique) - Fast email lookups
- `_id` (default) - Primary key

**Validation Rules:**
- Name: 2-80 characters, trimmed
- Email: Valid format, unique, lowercase
- Password Hash: Minimum 60 characters (bcrypt)
- Role: Only "user" or "admin"

---

### Resume Model
**Location:** `backend/models/Resume.js`

**Fields:**
```javascript
{
  _id: ObjectId (auto-generated)
  userId: ObjectId (required, ref: User)
  originalFilename: String (required)
  jobTitle: String (required, max 200)
  jobDescription: String (required)
  rawText: String (optional, extracted from PDF)
  status: String (enum: pending, processing, completed, failed)
  atsScore: Number (0-100, optional)
  extractedSkills: [String] (array of skills)
  missingSkills: [String] (array of missing skills)
  aiSummary: String (AI-generated summary)
  uploadedAt: Date (auto-generated)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

**Indexes:**
- `userId` - Find user's resumes
- `userId + uploadedAt` (compound) - Sort by date
- `status` - Filter by status
- `resumeId` (unique in Roadmap collection) - One roadmap per resume

**Status Lifecycle:**
```
pending → processing → completed ✓
                    ↘ failed ✗
```

---

### Roadmap Model
**Location:** `backend/models/Roadmap.js`

**Fields:**
```javascript
{
  _id: ObjectId (auto-generated)
  userId: ObjectId (required, ref: User)
  resumeId: ObjectId (required, unique, ref: Resume)
  targetRole: String (required, max 200)
  currentLevel: String (enum: student, junior, mid, senior)
  estimatedWeeks: Number (1-104)
  progressPercent: Number (0-100, default: 0)
  phases: [
    {
      phaseNumber: Number (1+)
      title: String (required)
      description: String (required)
      durationWeeks: Number (1+)
      skills: [String] (array of skills to learn)
      resources: [
        {
          title: String (required)
          url: String (required, valid HTTP/HTTPS)
        }
      ]
      completed: Boolean (default: false)
    }
  ]
  generatedAt: Date (auto-generated)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

**Indexes:**
- `resumeId` (unique) - One roadmap per resume
- `userId` - Find user's roadmaps
- `userId + generatedAt` (compound) - Sort by creation date

---

## 🔐 JWT Utilities

**Location:** `backend/utils/jwtUtils.js`

### Functions:

#### `generateToken(userId)`
Generates a JWT token with 7-day expiration.
```javascript
const token = generateToken("507f1f77bcf86cd799439011");
// Returns: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### `verifyToken(token)`
Verifies and decodes a JWT token.
```javascript
const decoded = verifyToken(token);
// Returns: { userId: "507f1f77bcf86cd799439011", iat: ..., exp: ... }
```

#### `extractToken(authHeader)`
Extracts token from "Bearer <token>" format.
```javascript
const token = extractToken("Bearer eyJhbGc...");
// Returns: eyJhbGc...
```

**Token Configuration:**
- Algorithm: HS256
- Expiration: 7 days (configurable via JWT_EXPIRES_IN)
- Issuer: smart-ats-api
- Secret: From JWT_SECRET environment variable

---

## ✅ Input Validation

**Location:** `backend/utils/validation.js`

### Functions:

- `isValidEmail(email)` - Email format validation
- `validatePassword(password)` - Password strength check (min 6 chars)
- `validateName(name)` - Name format check (2-80 chars)
- `validateRegistration(data)` - Complete registration validation
- `validateLogin(data)` - Login credentials validation
- `isValidObjectId(id)` - MongoDB ObjectId validation

---

## 📝 Constants

**Location:** `backend/constants/constants.js`

Centralized configuration values for:
- User roles (user, admin)
- Resume statuses (pending, processing, completed, failed)
- Experience levels (student, junior, mid, senior)
- Error & success messages
- File upload limits (5MB, PDF only)
- Validation rules
- Rate limiting config

---

## 🧪 Testing Phase A

### Run Verification Tests
```bash
node verify-phase-a.js
```

**Tests Included:**
1. ✅ Environment variable verification
2. ✅ Model definitions
3. ✅ Model schemas & fields
4. ✅ JWT utilities functionality
5. ✅ Constants definitions
6. ✅ AppError class
7. ✅ Logger functions
8. ✅ Validation utilities
9. ✅ MongoDB connection & collections
10. ✅ Database accessibility

**Sample Output:**
```
╔════════════════════════════════════════════════════════════╗
║       PHASE A: BACKEND FOUNDATION - VERIFICATION TEST     ║
╚════════════════════════════════════════════════════════════╝

🔧 Testing Environment Configuration...
✅ PASS: NODE_ENV Set (Current: development)
✅ PASS: PORT Configured (Port: 5000)
✅ PASS: MONGO_URI Set ✓
✅ PASS: JWT_SECRET Set ✓
...

✅ Passed: 48
❌ Failed: 0
📊 Total:  48
📈 Pass Rate: 100.0%

🎉 All Phase A tests passed! Ready for Phase B.
```

---

## 🚀 Running the Server

### Development Mode
```bash
npm run dev
```

**Expected Output:**
```
Server running in development mode on port 5000
MongoDB connected: cluster.mongodb.net
```

### Production Mode
```bash
NODE_ENV=production npm start
```

---

## 📚 File Descriptions

| File | Purpose | Status |
|------|---------|--------|
| `server.js` | Express app initialization | ✅ Updated |
| `config/db.js` | MongoDB connection | ✅ Complete |
| `models/User.js` | User schema | ✅ Complete |
| `models/Resume.js` | Resume schema | ✅ NEW |
| `models/Roadmap.js` | Roadmap schema | ✅ NEW |
| `models/index.js` | Models export | ✅ NEW |
| `utils/jwtUtils.js` | JWT operations | ✅ NEW |
| `utils/AppError.js` | Error class | ✅ NEW |
| `utils/validation.js` | Input validation | ✅ NEW |
| `utils/logger.js` | Logging utility | ✅ NEW |
| `constants/constants.js` | App constants | ✅ NEW |
| `middleware/errorMiddleware.js` | Error handler | ✅ Complete |
| `.env.example` | Environment template | ✅ NEW |
| `verify-phase-a.js` | Test suite | ✅ NEW |

---

## 🔗 Dependencies

All dependencies are already in `package.json`:

**Core:**
- express@^5.2.1
- mongoose@^9.7.0
- cors@^2.8.6
- helmet@^8.2.0
- dotenv@^17.4.2

**Authentication:**
- jsonwebtoken@^9.0.3
- bcryptjs@^3.0.3

**File Handling:**
- multer@^2.1.1
- pdf-parse@^2.4.5

**AI Integration:**
- @google/generative-ai@^0.24.1

**Security:**
- express-rate-limit@^8.5.2

**Development:**
- nodemon@^3.1.14

---

## 💡 Best Practices Implemented

✅ **Security:**
- Password hashing with bcryptjs
- JWT token-based authentication
- CORS configuration
- Security headers with Helmet
- Input validation and sanitization

✅ **Database:**
- Proper indexes for query optimization
- Schema validation rules
- Relationship definitions
- Timestamps on all documents

✅ **Error Handling:**
- Standardized AppError class
- Comprehensive error middleware
- Detailed error messages
- Stack traces in development

✅ **Code Organization:**
- Modular file structure
- Centralized constants
- Utility functions for reusability
- Clear separation of concerns

✅ **Logging:**
- Timestamped logs
- Level-based logging (info, warn, error, debug)
- Database operation tracking
- HTTP request logging

✅ **Documentation:**
- JSDoc comments on all functions
- Inline comments for complex logic
- This comprehensive guide

---

## 📌 Next Steps

Once Phase A is verified:
1. ✅ All files are created
2. ✅ Models are defined with proper indexes
3. ✅ JWT utilities are ready
4. ✅ Error handling is in place
5. ✅ Validation utilities are available

**Proceed to Phase B:** Authentication Module
- Register API endpoint
- Login API endpoint
- Get Current User API endpoint
- Auth middleware for route protection

---

## 🆘 Troubleshooting

### MongoDB Connection Error
```bash
# Check MONGO_URI format:
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority

# Ensure:
- Credentials are correct
- IP whitelist includes your server IP
- Database name is correct
```

### JWT Secret Error
```bash
# Ensure JWT_SECRET has at least 32 characters:
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
```

### Port Already in Use
```bash
# Change PORT in .env:
PORT=5001
```

---

## ✨ Summary

**Phase A Deliverables - All Complete:**
- ✅ User Model (complete with validation)
- ✅ Resume Model (with all fields & indexes)
- ✅ Roadmap Model (with phase structure)
- ✅ JWT Utilities (generate, verify, extract)
- ✅ MongoDB Connection (with lifecycle handlers)
- ✅ Error Middleware (comprehensive error handling)
- ✅ Validation Utilities (reusable validation functions)
- ✅ Logger Utilities (centralized logging)
- ✅ Constants (app-wide configuration)
- ✅ Environment Configuration (.env.example)
- ✅ Verification Tests (comprehensive test suite)

**Status: READY FOR PHASE B** 🚀

---

*Created: 2026-06-12*
*Phase: A - Backend Foundation*
*Version: 1.0.0*
