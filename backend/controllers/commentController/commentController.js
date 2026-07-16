const postModel = require("../../models/postModel");
const commentModel = require("../../models/commentModel");

module.exports.addComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;
    const { text } = req.body;

    // validation
    if (!text || text.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Comment is required",
      });
    }
    console.log(typeof postId);
    console.log(postId);

    // check post exists
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }

    // create comment
    const comment = await commentModel.create({
      user: userId,
      post: postId,
      text: text.trim(),
    });

    // Populate user details
    await comment.populate("user", "username profilePicture");

    // Push comment id in post
    post.comments.push(comment._id);
    await post.save();

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment,
      postId,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    // check if post exists
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }

    // get all comments of the post
    const comments = await commentModel
      .find({ post: postId })
      .populate("user", "username profilePicture")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Comments fetched successfully.",
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.deleteComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { commentId } = req.params;

    // find comment
    const comment = await commentModel.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // check ownership
    if (comment.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this comment.",
      });
    }

    // Remove comment id from post
    await postModel.findByIdAndUpdate(comment.post, {
      $pull: {
        comments: comment._id,
      },
    });

    // delete comment
    await commentModel.findByIdAndDelete(commentId);

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
