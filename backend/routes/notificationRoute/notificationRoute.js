const express = require("express");
const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} = require("../../controllers/notificationController/notificationController");
const router = express.Router();

// get all notifications
router.get("/", getNotifications);

// mark a single notification as read
router.patch("/:id/read", markAsRead);

// mark all notifications  as read
router.patch("/read-all", markAllAsRead);

// delete a notification
router.delete("/:id", deleteNotification);

module.exports = router;
