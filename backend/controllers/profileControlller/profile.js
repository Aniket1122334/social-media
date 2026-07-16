const { myProfileDTO, searchUserDTO } = require("../../DTO/profileDTO");
const userModel = require("../../models/userModel");
const mongoose = require("mongoose");

module.exports.profile = (req, res) => {
  try {
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
