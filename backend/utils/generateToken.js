const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  if (!userId) {
    throw new Error("userId is required to generate a token");
  }

  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "7d" }
  );
};

module.exports = generateToken;