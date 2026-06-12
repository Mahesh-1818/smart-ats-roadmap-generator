/**
 * Application Constants
 * Centralized configuration values used throughout the backend
 */

module.exports = {
  // ─── User Roles ─────────────────────────────────────────────────────────
  USER_ROLES: {
    USER: "user",
    ADMIN: "admin",
  },

  // ─── Resume Status ──────────────────────────────────────────────────────
  RESUME_STATUS: {
    PENDING: "pending",
    PROCESSING: "processing",
    COMPLETED: "completed",
    FAILED: "failed",
  },

  // ─── Experience Levels ──────────────────────────────────────────────────
  EXPERIENCE_LEVELS: {
    STUDENT: "student",
    JUNIOR: "junior",
    MID: "mid",
    SENIOR: "senior",
  },

  // ─── File Upload ────────────────────────────────────────────────────────
  FILE: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_MIMES: ["application/pdf"],
    UPLOAD_DIR: "./uploads/resumes",
  },

  // ─── Pagination ─────────────────────────────────────────────────────────
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
  },

  // ─── Validation Rules ───────────────────────────────────────────────────
  VALIDATION: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 80,
    PASSWORD_MIN_LENGTH: 6,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  // ─── Error Messages ─────────────────────────────────────────────────────
  ERROR_MESSAGES: {
    INVALID_CREDENTIALS: "Invalid email or password",
    EMAIL_EXISTS: "Email is already registered",
    USER_NOT_FOUND: "User not found",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Forbidden access",
    NOT_FOUND: "Resource not found",
    VALIDATION_ERROR: "Validation failed",
    SERVER_ERROR: "Internal server error",
    FILE_UPLOAD_ERROR: "File upload failed",
    INVALID_FILE_TYPE: "Only PDF files are allowed",
    FILE_TOO_LARGE: "File size exceeds 5MB limit",
    INVALID_TOKEN: "Invalid or expired token",
    SESSION_EXPIRED: "Session has expired. Please log in again",
  },

  // ─── Success Messages ───────────────────────────────────────────────────
  SUCCESS_MESSAGES: {
    USER_REGISTERED: "User registered successfully",
    LOGIN_SUCCESS: "Login successful",
    LOGOUT_SUCCESS: "Logout successful",
    RESUME_UPLOADED: "Resume uploaded successfully",
    RESUME_DELETED: "Resume deleted successfully",
    ROADMAP_GENERATED: "Roadmap generated successfully",
  },

  // ─── JWT ────────────────────────────────────────────────────────────────
  JWT: {
    ISSUER: "smart-ats-api",
    ALGORITHM: "HS256",
    DEFAULT_EXPIRY: "7d",
  },

  // ─── Rate Limiting ──────────────────────────────────────────────────────
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100,
  },

  // ─── Database ───────────────────────────────────────────────────────────
  DATABASE: {
    DEFAULT_DB_NAME: "smart_ats",
    CONNECTION_TIMEOUT: 5000,
  },
};
