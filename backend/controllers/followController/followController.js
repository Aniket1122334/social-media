const { getReceiverSocketId, getIO } = require("../../config/socket");
const userModel = require("../../models/userModel");
const {
  createNotification,
  deleteNotification,
} = require("../../utils/notificationHelper");

module.exports.followUser = async (req, res) => {
  // console.log(req);
  try {
    const loggedInUserId = req.user._id;
    // console.log(loggedInUserId);
    const { id: targetUserId } = req.params;

    // user cannot follow himself
    if (loggedInUserId.toString() === targetUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    // find both users
    const loggedInUser = await userModel.findById(loggedInUserId);

    const targetUser = await userModel.findById(targetUserId);

    if (!loggedInUser || !targetUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // alerady following
    const alreadyFollowing = loggedInUser.following.some(
      (id) => id.toString() === targetUserId,
    );

    if (alreadyFollowing) {
      return res.status(400).json({
        success: false,
        message: "You are already following this user",
      });
    }

    // update both users
    loggedInUser.following.push(targetUserId);
    targetUser.followers.push(loggedInUserId);

    await loggedInUser.save();
    await targetUser.save();

    // notification create
    if (loggedInUserId.toString() !== targetUserId) {
      const notification = await createNotification({
        sender: loggedInUserId,
        receiver: targetUserId,
        type: "FOLLOW",
      });

      const receiverSocketId = getReceiverSocketId(targetUserId);

      if (receiverSocketId) {
        getIO().to(receiverSocketId).emit("newNotification", notification);
      }
    }

    return res.status(200).json({
      success: true,
      message: "User followed successfully.",
      followingId: targetUserId,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.unfollowerUser = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    const { id: targetUserId } = req.params;

    // user cannot unfollow himself
    if (loggedInUserId.toString() === targetUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot unfollow yourself",
      });
    }

    // find both users
    const loggedInUser = await userModel.findById(loggedInUserId);

    const targetUser = await userModel.findById(targetUserId);

    if (!loggedInUser || !targetUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const alreadyFollowing = loggedInUser.following.some(
      (id) => id.toString() === targetUserId,
    );

    if (!alreadyFollowing) {
      return res.status(400).json({
        success: false,
        message: "You are not following this user",
      });
    }
    // remove target user from the following list
    loggedInUser.following = loggedInUser.following.filter(
      (userId) => userId.toString() !== targetUserId,
    );

    // Remove logged in user from followers list
    targetUser.followers = targetUser.followers.filter(
      (userId) => userId.toString() !== loggedInUserId,
    );

    await Promise.all([loggedInUser.save(), targetUser.save()]);

    // create notification
    if (loggedInUserId.toString() !== targetUserId) {
      await deleteNotification({
        sender: loggedInUserId,
        receiver: targetUserId,
        type: "FOLLOW",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User unfollowed successfully.",
      unfollowingId: targetUserId,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
