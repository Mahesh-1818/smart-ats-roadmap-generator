/**
 * Logger Utility
 * Centralized logging for development and production environments
 */

const isDev = process.env.NODE_ENV === "development";

/**
 * Log info level
 * @param {string} message - Message to log
 * @param {any} data - Optional additional data
 */
const info = (message, data) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [INFO] ${message}`, data ? data : "");
};

/**
 * Log error level
 * @param {string} message - Message to log
 * @param {Error|any} error - Error object or data
 */
const error = (message, errorObj) => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] [ERROR] ${message}`);
  
  if (errorObj) {
    if (errorObj instanceof Error) {
      console.error(errorObj.message);
      if (isDev && errorObj.stack) {
        console.error(errorObj.stack);
      }
    } else {
      console.error(errorObj);
    }
  }
};

/**
 * Log warning level
 * @param {string} message - Message to log
 * @param {any} data - Optional additional data
 */
const warn = (message, data) => {
  const timestamp = new Date().toISOString();
  console.warn(`[${timestamp}] [WARN] ${message}`, data ? data : "");
};

/**
 * Log debug level (only in development)
 * @param {string} message - Message to log
 * @param {any} data - Optional additional data
 */
const debug = (message, data) => {
  if (isDev) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [DEBUG] ${message}`, data ? data : "");
  }
};

/**
 * Log database operations
 * @param {string} operation - Operation name
 * @param {string} collection - Collection name
 * @param {number} duration - Duration in ms
 */
const dbOperation = (operation, collection, duration) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [DB] ${operation} on ${collection} (${duration}ms)`);
};

/**
 * Log HTTP request
 * @param {string} method - HTTP method
 * @param {string} url - Request URL
 * @param {number} statusCode - Response status code
 * @param {number} duration - Duration in ms
 */
const httpRequest = (method, url, statusCode, duration) => {
  const timestamp = new Date().toISOString();
  const statusEmoji = statusCode >= 400 ? "❌" : "✅";
  console.log(
    `[${timestamp}] ${statusEmoji} ${method} ${url} → ${statusCode} (${duration}ms)`
  );
};

module.exports = {
  info,
  error,
  warn,
  debug,
  dbOperation,
  httpRequest,
};
