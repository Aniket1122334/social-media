const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  // console.log("1");

  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // console.log("2", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No Token Provided",
      });
    }

    // console.log("3");

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("4", decoded);

    // find user from the DB
    const user = await userModel.findById(decoded.id);

    // console.log("5", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
