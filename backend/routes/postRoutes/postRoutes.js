const express = require("express");
const upload = require("../../middlewares/multer");
const {
  createPost,
  allPosts,
  singlePost,
  toggleLikes,
} = require("../../controllers/postController/postController");
const authMiddleware = require("../../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-post", authMiddleware, upload.single("media"), createPost);

router.get("/all-posts", authMiddleware, allPosts);

router.get("/:id", authMiddleware, singlePost);

router.patch("/:postId/like", authMiddleware, toggleLikes);
module.exports = router;
