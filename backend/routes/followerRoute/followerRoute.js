const express = require("express");
const {
  followUser,
  unfollowerUser,
} = require("../../controllers/followController/followController");
const router = express.Router();

router.post("/user/:id", followUser);
router.delete("/user/:id", unfollowerUser);

module.exports = router;
