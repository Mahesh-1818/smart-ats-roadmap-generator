const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // ─── Validate Required Fields ──────────────────────────────────────────────
    if (!name || !email || !password) {
      const error = new Error("Name, email and password are required");
      error.statusCode = 400;
      return next(error);
    }

    // ─── Password Strength ─────────────────────────────────────────────────────
    if (password.length < 8) {
      const error = new Error("Password must be at least 8 characters");
      error.statusCode = 400;
      return next(error);
    }

    // ─── Duplicate Email Check ─────────────────────────────────────────────────
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });

    if (existingUser) {
      const error = new Error("An account with this email already exists");
      error.statusCode = 409;
      return next(error);
    }

    // ─── Hash Password ─────────────────────────────────────────────────────────
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // ─── Create User ───────────────────────────────────────────────────────────
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
    });

    // ─── Generate Token ────────────────────────────────────────────────────────
    const token = generateToken(user._id);

    // ─── Response ──────────────────────────────────────────────────────────────
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error); // Handed to errorMiddleware.js
  }
};

module.exports = { registerUser };