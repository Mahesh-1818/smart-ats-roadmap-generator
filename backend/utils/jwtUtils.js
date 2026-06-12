const jwt = require("jsonwebtoken");

/**
 * Generate JWT token with 7-day expiration
 * @param {string} userId - User ID to encode in token
 * @returns {string} JWT token
 * @throws {Error} If token generation fails
 */
const generateToken = (userId) => {
  if (!userId) {
    throw new Error("User ID is required to generate token");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  try {
    const token = jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
        issuer: "smart-ats-api",
        algorithm: "HS256",
      }
    );

    return token;
  } catch (error) {
    throw new Error(`Token generation failed: ${error.message}`);
  }
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {object} Decoded token payload
 * @throws {Error} If token is invalid or expired
 */
const verifyToken = (token) => {
  if (!token) {
    throw new Error("Token is required for verification");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "smart-ats-api",
      algorithms: ["HS256"],
    });

    return decoded;
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      throw new Error("Token has expired");
    }
    if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid token");
    }
    throw error;
  }
};

/**
 * Extract token from Authorization header
 * @param {string} authHeader - Authorization header value
 * @returns {string|null} Token or null if not found
 */
const extractToken = (authHeader) => {
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
    return null;
  }

  return parts[1];
};

module.exports = {
  generateToken,
  verifyToken,
  extractToken,
};
