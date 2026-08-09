const { myProfileDTO, searchUserDTO } = require("../../DTO/profileDTO");
const userModel = require("../../models/userModel");
const mongoose = require("mongoose");
const uploadToCloudinary = require("../../utils/uploadToCloudinary");

module.exports.profile = async (req, res) => {
  try {
    await req.user.populate([
      {
        path: "posts",
      },
      {
        path: "followers",
        select: "username fullname profilePicture",
      },
      {
        path: "following",
        select: "username fullname profilePicture",
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Profile Fetched Successfully",
      user: myProfileDTO(req.user),
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.searchProfiles = async (req, res) => {
  try {
    // saech text from frontend
    const { q } = req.query;

    // if search is empty
    if (!q || q.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    // search database
    const users = await userModel
      .find({
        fullname: {
          $regex: q,
          $options: "i",
        },
      })
      .select(" -email")
      .limit(10);

    return res.status(200).json({
      success: true,
      users: users.map(searchUserDTO),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.allProfiles = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    // Logged-in user ki following list lao
    const loggedInUser = await userModel
      .findById(loggedInUserId)
      .select("following");

    // Exclude list = khud + already following users
    const excludeUsers = [
      new mongoose.Types.ObjectId(loggedInUserId),
      ...loggedInUser.following,
    ];

    const users = await userModel.aggregate([
      {
        $match: {
          _id: {
            $nin: excludeUsers,
          },
        },
      },
      {
        $sample: {
          size: 10,
        },
      },
      {
        $project: {
          password: 0,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Suggested users fetched successfully.",
      users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.editProfile = async (req, res) => {
  try {
    const { fullname, username, bio, gender, website } = req.body;

    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Username unique check
    if (username && username !== user.username) {
      const existingUser = await userModel.findOne({ username });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }

      user.username = username;
    }

    if (fullname) user.fullname = fullname;
    if (bio !== undefined) user.bio = bio;
    if (gender) user.gender = gender;
    if (website) user.website = website;

    // upload
    if (req.file) {
      const uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "instagram/profile",
      );

      user.profilePicture = uploadedImage.secure_url;
    }

    await user.save();

    await user.populate([
      {
        path: "posts",
      },
      {
        path: "followers",
        select: "username fullname profilePicture",
      },
      {
        path: "following",
        select: "username fullname profilePicture",
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: myProfileDTO(user),
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
