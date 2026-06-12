/**
 * Custom AppError class for standardized error handling
 * Extends native Error with statusCode for HTTP responses
 */
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
