const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
    },

    otp: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
      enum: ["SIGNUP", "LOGIN", "RESET_PASSWORD"],
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    resendCount: {
      type: Number,
      default: 1,
    },

    failedAttempts: {
      type: Number,
      default: 0,
    },

    firstRequestAt: {
      type: Date,
      default: Date.now,
    },

    lastSentAt: {
      type: Date,
      default: Date.now,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("OTP", otpSchema);
