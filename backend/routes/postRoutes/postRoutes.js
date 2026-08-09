const express = require("express");
const upload = require("../../middlewares/multer");
const {
  createPost,
  allPosts,
  singlePost,
  toggleLikes,
} = require("../../controllers/postController/postController");
const router = express.Router();

router.post("/create-post", upload.single("media"), createPost);

router.get("/all-posts", allPosts);

router.get("/:id", singlePost);

router.patch("/:postId/like", toggleLikes);
module.exports = router;
