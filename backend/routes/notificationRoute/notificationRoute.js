const express = require("express");
const {
  getNotifications,
  markAsRead,
} = require("../../controllers/notificationController/notificationController");
const router = express.Router();

// get all notifications
router.get("/", getNotifications);

// mark a single notification as read
router.patch("/:id/read", markAsRead);

module.exports = router;
