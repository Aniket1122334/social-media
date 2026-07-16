const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("comment", commentSchema);
