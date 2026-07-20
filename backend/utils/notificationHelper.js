const notificationModel = require("../models/notificationModel");

module.exports.createNotification = async ({
  sender,
  receiver,
  type,
  post = null,
  comment = null,
}) => {
  // Count receiver notifications

  // If already 20 notifications, delete the oldest one
  const count = await notificationModel.countDocuments({ receiver });

  if (count >= 20) {
    await notificationModel.findOneAndDelete(
      { receiver },
      { sort: { createdAt: 1 } },
    );
  }

  // Create new notification
  return await notificationModel.create({
    sender,
    receiver,
    type,
    post,
    comment,
  });
};

module.exports.deleteNotification = async ({
  sender,
  receiver,
  type,
  post = null,
  comment = null,
}) => {
  return await notificationModel.findOneAndDelete({
    sender,
    receiver,
    type,
    post,
    comment,
  });
};
