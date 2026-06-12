const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },

    originalFilename: {
      type: String,
      required: [true, "Original filename is required"],
      trim: true,
    },

    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxlength: [200, "Job title cannot exceed 200 characters"],
    },

    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
    },

    rawText: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: {
        values: ["pending", "processing", "completed", "failed"],
        message: "Status must be one of: pending, processing, completed, failed",
      },
      default: "pending",
      index: true,
    },

    atsScore: {
      type: Number,
      min: [0, "ATS Score cannot be less than 0"],
      max: [100, "ATS Score cannot be more than 100"],
      default: null,
    },

    extractedSkills: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    aiSummary: {
      type: String,
      default: "",
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient querying
resumeSchema.index({ userId: 1, uploadedAt: -1 });

// Index for status-based queries
resumeSchema.index({ status: 1 });

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
