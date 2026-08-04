const mongoose = require("mongoose");
const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

conversationSchema.index({
  participants: 1,
});

module.exports = mongoose.model("conversation", conversationSchema);
