# 🚀 Phase A - Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Copy Environment File
```bash
cd backend
cp .env.example .env
```

### Step 2: Configure .env
Edit `.env` and update:
```env
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASS@cluster.mongodb.net/smart_ats
JWT_SECRET=your_32_character_minimum_secret_key_here
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
PORT=5000
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Verify Setup
```bash
node verify-phase-a.js
```

**Expected Output:**
```
✅ Passed: 48
❌ Failed: 0
🎉 All Phase A tests passed!
```

### Step 5: Start Server
```bash
npm run dev
```

**Expected Output:**
```
Server running in development mode on port 5000
MongoDB connected: cluster-name.mongodb.net
```

---

## 📁 File Structure Overview

```
backend/
├── models/
│   ├── User.js        # User authentication model
│   ├── Resume.js      # Resume upload & parsing
│   ├── Roadmap.js     # Career roadmap generation
│   └── index.js       # Central export
│
├── utils/
│   ├── jwtUtils.js    # Token generation & verification
│   ├── validation.js  # Input validation
│   ├── logger.js      # Logging system
│   └── AppError.js    # Error handling
│
├── constants/
│   └── constants.js   # App-wide configuration
│
├── config/
│   └── db.js          # MongoDB connection
│
├── middleware/
│   └── errorMiddleware.js  # Global error handler
│
├── server.js          # Express app
├── package.json       # Dependencies
├── .env              # Environment (create from .env.example)
│
├── PHASE_A_README.md       # Detailed documentation
├── PHASE_A_SUMMARY.md      # Completion summary
├── QUICK_START.md          # This file
└── verify-phase-a.js       # Test suite
```

---

## 🔑 Key Components

### 1. JWT Utilities
```javascript
const { generateToken, verifyToken, extractToken } = require('./utils/jwtUtils');

// Generate token
const token = generateToken(userId);

// Verify token
const decoded = verifyToken(token);

// Extract from header
const token = extractToken('Bearer xyz...');
```

### 2. Validation
```javascript
const { validateEmail, validatePassword, validateRegistration } = require('./utils/validation');

// Validate registration
const result = validateRegistration({ name, email, password });
if (!result.isValid) {
  console.error(result.message);
}
```

### 3. Error Handling
```javascript
const AppError = require('./utils/AppError');

throw new AppError('Email already exists', 409);
// Or let middleware handle it
```

### 4. Logging
```javascript
const Logger = require('./utils/logger');

Logger.info('User logged in', { userId: '123' });
Logger.error('Database error', error);
Logger.debug('Debug info', { data });
```

### 5. Constants
```javascript
const Constants = require('./constants/constants');

console.log(Constants.USER_ROLES.USER);        // 'user'
console.log(Constants.RESUME_STATUS.PENDING);  // 'pending'
console.log(Constants.ERROR_MESSAGES.INVALID_CREDENTIALS);
```

---

## 📊 Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  passwordHash: String (bcrypt),
  role: String ('user' or 'admin'),
  createdAt: Date,
  updatedAt: Date
}
```

### Resume Model
```javascript
{
  userId: ObjectId (ref: User),
  originalFilename: String,
  jobTitle: String,
  jobDescription: String,
  status: String ('pending', 'processing', 'completed', 'failed'),
  atsScore: Number (0-100),
  extractedSkills: [String],
  missingSkills: [String],
  aiSummary: String,
  uploadedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Roadmap Model
```javascript
{
  userId: ObjectId (ref: User),
  resumeId: ObjectId (ref: Resume, unique),
  targetRole: String,
  currentLevel: String ('student', 'junior', 'mid', 'senior'),
  estimatedWeeks: Number,
  progressPercent: Number (0-100),
  phases: [
    {
      phaseNumber: Number,
      title: String,
      description: String,
      durationWeeks: Number,
      skills: [String],
      resources: [{ title: String, url: String }],
      completed: Boolean
    }
  ],
  generatedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Testing

### Run All Tests
```bash
node verify-phase-a.js
```

### Tests Included
- ✅ Environment variables
- ✅ Model definitions
- ✅ Model schemas
- ✅ JWT utilities
- ✅ Constants
- ✅ AppError class
- ✅ Logger functions
- ✅ Validation utilities
- ✅ MongoDB connection

---

## 📚 Environment Variables

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `MONGO_URI` | Yes | - | MongoDB connection string |
| `DB_NAME` | No | smart_ats | Database name |
| `JWT_SECRET` | Yes | - | Token signing secret (32+ chars) |
| `JWT_EXPIRES_IN` | No | 7d | Token expiration |
| `NODE_ENV` | No | development | Environment mode |
| `PORT` | No | 5000 | Server port |
| `CLIENT_ORIGIN` | No | http://localhost:5173 | CORS origin |
| `GEMINI_API_KEY` | Yes | - | Gemini API key |

---

## 🔐 Security Reminders

1. **Never commit .env** - Already in .gitignore
2. **Use strong JWT_SECRET** - At least 32 characters, random
3. **Protect API keys** - Store in .env only
4. **CORS configured** - Set CLIENT_ORIGIN properly
5. **Password hashing** - Will use bcryptjs in Phase B
6. **Input validation** - Already implemented in utils/validation.js

---

## 🐛 Troubleshooting

### Error: MONGO_URI is not set
```bash
# Make sure .env exists and has MONGO_URI
cat .env | grep MONGO_URI

# Should output something like:
# MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/smart_ats
```

### Error: JWT_SECRET is not set
```bash
# Add to .env
JWT_SECRET=your_super_secret_key_minimum_32_characters_long
```

### MongoDB Connection Failed
```bash
# Check connection string format
# mongodb+srv://username:password@cluster.mongodb.net/dbname

# Verify:
# 1. Username/password are correct
# 2. IP is whitelisted in MongoDB Atlas
# 3. Database name is correct
```

### Tests Failing
```bash
# Make sure all dependencies are installed
npm install

# Verify Node version
node --version  # Should be 14+

# Check MongoDB is running
# Try connecting directly to test
```

---

## 📖 What's Next (Phase B)

Phase B will implement:
- ✅ User registration endpoint
- ✅ User login endpoint
- ✅ Get current user endpoint
- ✅ Auth middleware for route protection
- ✅ Postman collection for testing

---

## 💡 Tips

### Development
```bash
# Run with nodemon (auto-restart on file changes)
npm run dev

# Use the logger for debugging
const Logger = require('./utils/logger');
Logger.debug('Debug info', { variable });
```

### Database Queries
```javascript
const { User, Resume, Roadmap } = require('./models');

// Create
const user = new User({ name: 'John', email: 'john@example.com' });
await user.save();

// Read
const user = await User.findById(userId);

// Update
await User.findByIdAndUpdate(userId, { name: 'Jane' });

// Delete
await User.findByIdAndDelete(userId);
```

### Error Handling
```javascript
const AppError = require('./utils/AppError');

try {
  // code
} catch (error) {
  throw new AppError('Custom message', 400);
}
```

---

## 📞 Support

For detailed information, see:
- `PHASE_A_README.md` - Complete guide
- `PHASE_A_SUMMARY.md` - What was created
- `verify-phase-a.js` - Test source code

---

## ✅ Phase A Status

**STATUS: COMPLETE** ✅

All components implemented and tested:
- ✅ Models (User, Resume, Roadmap)
- ✅ Utilities (JWT, Validation, Logger, Error)
- ✅ Configuration (Constants, Environment)
- ✅ Database (MongoDB connection ready)
- ✅ Testing (48+ tests, all passing)
- ✅ Documentation (complete)

**Ready for Phase B!** 🚀

---

*Quick Start Guide - Phase A*
*Created: 2026-06-12*
*Status: READY*
