const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },

    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: [true, "Resume ID is required"],
      unique: true,
      index: true,
    },

    targetRole: {
      type: String,
      required: [true, "Target role is required"],
      trim: true,
      maxlength: [200, "Target role cannot exceed 200 characters"],
    },

    currentLevel: {
      type: String,
      enum: {
        values: ["student", "junior", "mid", "senior"],
        message: "Current level must be one of: student, junior, mid, senior",
      },
      required: [true, "Current level is required"],
    },

    estimatedWeeks: {
      type: Number,
      required: [true, "Estimated weeks is required"],
      min: [1, "Estimated weeks must be at least 1"],
      max: [104, "Estimated weeks cannot exceed 2 years (104 weeks)"],
    },

    progressPercent: {
      type: Number,
      default: 0,
      min: [0, "Progress cannot be less than 0"],
      max: [100, "Progress cannot exceed 100"],
    },

    phases: [
      {
        phaseNumber: {
          type: Number,
          required: true,
          min: 1,
        },

        title: {
          type: String,
          required: [true, "Phase title is required"],
          trim: true,
        },

        description: {
          type: String,
          required: [true, "Phase description is required"],
          trim: true,
        },

        durationWeeks: {
          type: Number,
          required: [true, "Phase duration is required"],
          min: [1, "Duration must be at least 1 week"],
        },

        skills: {
          type: [String],
          default: [],
        },

        resources: [
          {
            title: {
              type: String,
              required: [true, "Resource title is required"],
            },
            url: {
              type: String,
              required: [true, "Resource URL is required"],
              match: [
                /^https?:\/\/.+/,
                "Resource URL must be a valid HTTP/HTTPS URL",
              ],
            },
            _id: false,
          },
        ],

        completed: {
          type: Boolean,
          default: false,
        },

        _id: false,
      },
    ],

    generatedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for user's roadmaps
roadmapSchema.index({ userId: 1, generatedAt: -1 });

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

module.exports = Roadmap;
