const conversationModel = require("../../models/conversationModel");
const messageModel = require("../../models/messageModel");
const userModel = require("../../models/userModel");
const { getReceiverSocketId, getIO } = require("../../config/socket");

module.exports.sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId } = req.params;
    const { text, image = null } = req.body;

    // validation
    if (!text || (text.trim() === "" && !image)) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    // sender cannot message himself
    if (senderId === receiverId) {
      return res.status(400).json({
        success: false,
        message: "You cannot message yourself",
      });
    }

    // check receiver exists
    const receiver = await userModel.findById(receiverId);

    if (!receiver) {
      return res.status(400).json({
        success: false,
        message: "receiver not found",
      });
    }

    // find existing converstion
    let conversation = await conversationModel.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    // create conversation if not exists

    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    // create message
    const message = await messageModel.create({
      conversation: conversation._id,
      sender: senderId,
      receiver: receiverId,
      text: text?.trim() || "",
      image: image || "",
    });

    // update last message
    conversation.lastMessage = message._id;
    await conversation.save();
    await message.populate([
      {
        path: "sender",
        select: "fullname username profilePicture",
      },
      {
        path: "receiver",
        select: "fullname username profilePicture",
      },
    ]);

    // add socket
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      getIO().to(receiverSocketId).emit("newMessage", message);
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: message,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.getMessage = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { receiverId } = req.params;

    // Receiver exists?
    const receiver = await userModel.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Receiver not found",
      });
    }

    // Find Conversation
    const conversation = await conversationModel.findOne({
      participants: {
        $all: [currentUserId, receiverId],
      },
    });

    // Conversation not found
    if (!conversation) {
      return res.status(200).json({
        success: true,
        conversationId: null,
        messages: [],
      });
    }

    // Mark all received messages as seen
    await messageModel.updateMany(
      {
        conversation: conversation._id,
        receiver: currentUserId,
        isSeen: false,
      },
      {
        $set: {
          isSeen: true,
        },
      },
    );

    // Notify sender
    const senderSocketId = getReceiverSocketId(receiverId);

    if (senderSocketId) {
      getIO().to(senderSocketId).emit("messagesSeen", {
        conversationId: conversation._id,
      });
    }

    // Fetch Messages
    const messages = await messageModel
      .find({
        conversation: conversation._id,
      })
      .populate("sender", "fullname username profilePicture")
      .populate("receiver", "fullname username profilePicture")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      conversationId: conversation._id,
      messages,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
