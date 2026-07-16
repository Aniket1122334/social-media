const notificationModel = require("../../models/notificationModel");

module.exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const notifications = await notificationModel
      .find({
        receiver: userId,
      })
      .populate("sender", "username profilePicture")
      .populate("post", "media")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Notifications fetched successfully",
      notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await notificationModel.findById(id);

    if (!notification) {
      return res.status(400).json({
        success: false,
        message: "Notification not found",
      });
    }

    // security Check

    if (notification.receiver.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    notification.isRead = true;
    await notification.save();

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    await notificationModel.updateMany(
      {
        receiver: userId,
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      },
    );

    return res.status(200).json({
      success: false,
      message: "All notifications marked as read",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await notificationModel.findById(id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    // security Check

    if (notification.receiver.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    await notificationModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
