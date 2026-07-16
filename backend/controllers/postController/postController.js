const postModel = require("../../models/postModel");
const userModel = require("../../models/userModel");
const uploadToCloudinary = require("../../utils/uploadToCloudinary");
const {
  postValidation,
} = require("../../validation/postValidation/postValidation");

module.exports.createPost = async (req, res) => {
  // console.log("✅ createPost controller called");
  try {
    const { error } = postValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Media is required.",
      });
    }
    const { caption, postType } = req.body;

    // upload to cloudinary
    const uploadResult = await uploadToCloudinary(
      req.file.buffer,
      "insta/posts",
    );

    const post = await postModel.create({
      user: req.user._id,
      caption,
      media: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      postType,
    });

    const user = await userModel.findById(req.user._id);
    user.posts.push(post._id);
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Post uploaded successfully.",
      post,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.allPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("user", "username fullname profilePicture")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalPosts: posts.length,
      posts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.singlePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postModel
      .findById(id)
      .populate("user", "fullname username profilePicture");

    // console.log(post);

    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      post,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.toggleLikes = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    // check post exists
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    // check if user already liked the post
    const alreadyLiked = post.likes.includes(userId);

    // unlike
    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      // like
      post.likes.push(userId);

      // notification create
    }

    await post.save();

    await post.populate("user", "username fullname profilePicture");

    return res.status(200).json({
      success: true,
      message: alreadyLiked
        ? "post unliked successfully"
        : "post liked successfully",

      likesCount: post.likes.length,
      liked: !alreadyLiked,
      post,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
