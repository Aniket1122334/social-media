const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    caption: {
      type: String,
      trim: true,
      default: "",
    },

    media: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    postType: {
      type: String,
      enum: ["post", "reel"],
      required: true,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("post", postSchema);
