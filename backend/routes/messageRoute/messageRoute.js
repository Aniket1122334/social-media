const express = require("express");
const {
  sendMessage,
  getMessage,
} = require("../../controllers/messageController/messageController");
const router = express.Router();

router.post("/send/:receiverId", sendMessage);
router.get("/:receiverId", getMessage);

module.exports = router;
