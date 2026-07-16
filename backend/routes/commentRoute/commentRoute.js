const express = require("express");
const {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../../controllers/commentController/commentController");
const router = express.Router();

// Add comment
router.post("/:postId", addComment);

// get all comments of a post
router.get("/:postId", getComments);

// delete a post
router.delete("/:commentId", deleteComment);

module.exports = router;
