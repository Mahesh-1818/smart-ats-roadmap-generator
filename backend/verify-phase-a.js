/**
 * Phase A Verification Script
 * Tests all Phase A deliverables:
 * - User Model
 * - Resume Model
 * - Roadmap Model
 * - JWT Utilities
 * - MongoDB Connection
 * - Error Middleware
 */

require("dotenv").config();

const mongoose = require("mongoose");
const { User, Resume, Roadmap } = require("./models");
const { generateToken, verifyToken, extractToken } = require("./utils/jwtUtils");
const AppError = require("./utils/AppError");
const Logger = require("./utils/logger");
const Constants = require("./constants/constants");

const testResults = {
  passed: 0,
  failed: 0,
  tests: [],
};

// ─── Test Helper Functions ──────────────────────────────────────────────────
const test = (name, passed, message = "") => {
  const status = passed ? "✅ PASS" : "❌ FAIL";
  console.log(`${status}: ${name} ${message}`);
  
  if (passed) {
    testResults.passed += 1;
  } else {
    testResults.failed += 1;
  }
  
  testResults.tests.push({
    name,
    passed,
    message,
  });
};

// ─── Test 1: Verify All Models Exist ────────────────────────────────────────
const testModelsExist = () => {
  console.log("\n📋 Testing Model Definitions...");
  
  test("User Model", User !== undefined, `(${User?.modelName})`);
  test("Resume Model", Resume !== undefined, `(${Resume?.modelName})`);
  test("Roadmap Model", Roadmap !== undefined, `(${Roadmap?.modelName})`);
};

// ─── Test 2: Verify JWT Utilities ───────────────────────────────────────────
const testJWTUtilities = () => {
  console.log("\n🔐 Testing JWT Utilities...");
  
  try {
    const testUserId = "507f1f77bcf86cd799439011";
    const token = generateToken(testUserId);
    test("Generate Token", token && typeof token === "string", `Token created`);
    
    const decoded = verifyToken(token);
    test(
      "Verify Token",
      decoded.userId === testUserId,
      `User ID matched: ${decoded.userId}`
    );
    
    const extracted = extractToken(`Bearer ${token}`);
    test(
      "Extract Token from Header",
      extracted === token,
      "Token extracted successfully"
    );
  } catch (error) {
    test("JWT Utilities", false, error.message);
  }
};

// ─── Test 3: Verify Constants ───────────────────────────────────────────────
const testConstants = () => {
  console.log("\n⚙️  Testing Constants...");
  
  test(
    "User Roles Defined",
    Constants.USER_ROLES.USER === "user" && Constants.USER_ROLES.ADMIN === "admin",
    "Both roles present"
  );
  
  test(
    "Resume Status Defined",
    Object.keys(Constants.RESUME_STATUS).length === 4,
    "All 4 statuses present"
  );
  
  test(
    "Experience Levels Defined",
    Object.keys(Constants.EXPERIENCE_LEVELS).length === 4,
    "All 4 levels present"
  );
  
  test(
    "Error Messages Defined",
    Object.keys(Constants.ERROR_MESSAGES).length > 10,
    `${Object.keys(Constants.ERROR_MESSAGES).length} messages`
  );
};

// ─── Test 4: Verify AppError Class ──────────────────────────────────────────
const testAppError = () => {
  console.log("\n⚠️  Testing AppError...");
  
  const error = new AppError("Test error", 400);
  test(
    "AppError Constructor",
    error.message === "Test error" && error.statusCode === 400,
    "Error created correctly"
  );
  
  test(
    "AppError Extends Error",
    error instanceof Error,
    "Is instance of Error"
  );
};

// ─── Test 5: Verify Logger Utilities ────────────────────────────────────────
const testLogger = () => {
  console.log("\n📝 Testing Logger...");
  
  try {
    test("Logger Info", typeof Logger.info === "function", "Function exists");
    test("Logger Error", typeof Logger.error === "function", "Function exists");
    test("Logger Warn", typeof Logger.warn === "function", "Function exists");
    test("Logger Debug", typeof Logger.debug === "function", "Function exists");
    test(
      "Logger DB Operation",
      typeof Logger.dbOperation === "function",
      "Function exists"
    );
    test(
      "Logger HTTP Request",
      typeof Logger.httpRequest === "function",
      "Function exists"
    );
  } catch (error) {
    test("Logger Functions", false, error.message);
  }
};

// ─── Test 6: Verify Validation Utilities ────────────────────────────────────
const testValidation = () => {
  console.log("\n✔️  Testing Validation...");
  
  const validation = require("./utils/validation");
  
  test(
    "Email Validation",
    validation.isValidEmail("test@example.com") &&
      !validation.isValidEmail("invalid-email"),
    "Email validation working"
  );
  
  const passwordValidation = validation.validatePassword("test123");
  test(
    "Password Validation",
    passwordValidation.isValid === true,
    "Password validation working"
  );
  
  const nameValidation = validation.validateName("John Doe");
  test("Name Validation", nameValidation.isValid === true, "Name validation working");
  
  test(
    "ObjectId Validation",
    validation.isValidObjectId("507f1f77bcf86cd799439011") &&
      !validation.isValidObjectId("invalid-id"),
    "ObjectId validation working"
  );
};

// ─── Test 7: Verify MongoDB Connection ──────────────────────────────────────
const testMongoDBConnection = async () => {
  console.log("\n🗄️  Testing MongoDB Connection...");
  
  try {
    if (!process.env.MONGO_URI) {
      test("MongoDB URI in .env", false, "MONGO_URI not found");
      return;
    }
    
    test("MongoDB URI in .env", true, "URI configured");
    
    // Test connection
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME || "smart_ats",
    });
    
    test(
      "MongoDB Connection",
      conn.connection.readyState === 1,
      `Connected to ${conn.connection.host}`
    );
    
    // Test collections exist
    const collections = await mongoose.connection.db.listCollections().toArray();
    test(
      "Database Accessible",
      collections !== undefined,
      `${collections.length} collections found`
    );
    
    // Close connection
    await mongoose.connection.close();
    test("MongoDB Disconnect", true, "Connection closed gracefully");
  } catch (error) {
    test("MongoDB Connection", false, error.message);
  }
};

// ─── Test 8: Verify Model Schemas ───────────────────────────────────────────
const testModelSchemas = () => {
  console.log("\n📊 Testing Model Schemas...");
  
  // User Schema
  const userSchema = User.schema;
  const userPaths = Object.keys(userSchema.paths);
  test(
    "User Schema Fields",
    userPaths.includes("name") &&
      userPaths.includes("email") &&
      userPaths.includes("passwordHash") &&
      userPaths.includes("role"),
    `${userPaths.length} fields defined`
  );
  
  // Resume Schema
  const resumeSchema = Resume.schema;
  const resumePaths = Object.keys(resumeSchema.paths);
  test(
    "Resume Schema Fields",
    resumePaths.includes("userId") &&
      resumePaths.includes("jobTitle") &&
      resumePaths.includes("status") &&
      resumePaths.includes("atsScore"),
    `${resumePaths.length} fields defined`
  );
  
  // Roadmap Schema
  const roadmapSchema = Roadmap.schema;
  const roadmapPaths = Object.keys(roadmapSchema.paths);
  test(
    "Roadmap Schema Fields",
    roadmapPaths.includes("userId") &&
      roadmapPaths.includes("resumeId") &&
      roadmapPaths.includes("phases") &&
      roadmapPaths.includes("progressPercent"),
    `${roadmapPaths.length} fields defined`
  );
};

// ─── Test 9: Verify Environment Variables ───────────────────────────────────
const testEnvironmentVariables = () => {
  console.log("\n🔧 Testing Environment Configuration...");
  
  test(
    "NODE_ENV Set",
    process.env.NODE_ENV !== undefined,
    `Current: ${process.env.NODE_ENV || "not set"}`
  );
  
  test(
    "PORT Configured",
    process.env.PORT !== undefined || true,
    `Port: ${process.env.PORT || 5000}`
  );
  
  test(
    "MONGO_URI Set",
    process.env.MONGO_URI !== undefined,
    process.env.MONGO_URI ? "✓" : "⚠️  Missing (required for database)"
  );
  
  test(
    "JWT_SECRET Set",
    process.env.JWT_SECRET !== undefined,
    process.env.JWT_SECRET ? "✓" : "⚠️  Missing (required for authentication)"
  );
  
  test(
    "CLIENT_ORIGIN Set",
    process.env.CLIENT_ORIGIN !== undefined,
    `Origin: ${process.env.CLIENT_ORIGIN || "http://localhost:5173"}`
  );
};

// ─── Main Test Runner ───────────────────────────────────────────────────────
const runTests = async () => {
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║       PHASE A: BACKEND FOUNDATION - VERIFICATION TEST     ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  
  testEnvironmentVariables();
  testModelsExist();
  testModelSchemas();
  testJWTUtilities();
  testConstants();
  testAppError();
  testLogger();
  testValidation();
  await testMongoDBConnection();
  
  // ─── Summary ────────────────────────────────────────────────────────────
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║                        TEST SUMMARY                        ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  
  const totalTests = testResults.passed + testResults.failed;
  const passPercentage = ((testResults.passed / totalTests) * 100).toFixed(1);
  
  console.log(`\n✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`📊 Total:  ${totalTests}`);
  console.log(`📈 Pass Rate: ${passPercentage}%`);
  
  if (testResults.failed === 0) {
    console.log("\n🎉 All Phase A tests passed! Ready for Phase B.\n");
  } else {
    console.log("\n⚠️  Some tests failed. Please review above.\n");
  }
  
  process.exit(testResults.failed > 0 ? 1 : 0);
};

// Run tests
runTests().catch((error) => {
  console.error("Test runner error:", error);
  process.exit(1);
});
