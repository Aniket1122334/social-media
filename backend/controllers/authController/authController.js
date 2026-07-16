const otpModel = require("../../models/otpModel");
const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const { signupValidation } = require("../../validation/userValidation/user");
const sendOTP = require("../../utils/sendOTP");
const jwt = require("jsonwebtoken");

module.exports.signup = async (req, res) => {
  try {
    //* validation

    const { error } = signupValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    //* destructure data
    const { fullname, username, email, password, confirmPassword } = req.body;

    // ! check password with confirm password
    if (password != confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // ! check existing email
    const existingEmail = await userModel.findOne({ email });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    // ! check username
    const existingUsername = await userModel.findOne({ username });

    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username already taken",
      });
    }

    // ! check otp limit (5 per hour)
    const otpRecord = await otpModel.findOne({ email, purpose: "SIGNUP" });

    // ! check otpRecord
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    // * if first request comes  1 hour ago
    if (otpRecord && otpRecord.firstRequestAt <= oneHourAgo) {
      otpRecord.resendCount = 0;
      otpRecord.firstRequestAt = new Date();
    }

    if (
      otpRecord &&
      otpRecord.resendCount >= 5 &&
      otpRecord.firstRequestAt > oneHourAgo
    ) {
      return res.status(429).json({
        success: false,
        message: "OTP request limit exceeded. Try again after 1 hour.",
      });
    }

    //* Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // * expires otp time
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // * hashed otp
    const hashedOTP = await bcrypt.hash(otp, 10);

    // * hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // * if otpRecord not present
    if (!otpRecord) {
      await otpModel.create({
        email,
        otp: hashedOTP,
        purpose: "SIGNUP",
        expiresAt,
        resendCount: 1,
        firstRequestAt: new Date(),
        lastSentAt: new Date(),
        password: hashedPassword,
      });
    } else {
      otpRecord.otp = hashedOTP;
      otpRecord.expiresAt = expiresAt;
      otpRecord.lastSentAt = new Date();
      otpRecord.resendCount += 1;
      otpRecord.password = hashedPassword;
      await otpRecord.save();
    }

    console.log(otp);

    // * send otp to email function
    const smsResult = await sendOTP(email, otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",

      fullname,
      username,
      email,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // ! check input
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // * search otp in otp model
    const otpRecord = await otpModel.findOne({ email, purpose: "SIGNUP" });

    if (!otpRecord) {
      return res.status(404).json({
        success: false,
        message: "OTP session expired or not found. Please signup again.",
      });
    }

    // * otp match
    const isValidOTP = await bcrypt.compare(otp, otpRecord.otp);

    if (!isValidOTP) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }

    const { fullname, username } = req.body;

    const newUser = await userModel.create({
      fullname,
      username,
      email,
      password: otpRecord.password,
      authProvider: "LOCAL",
      isVerified: true,
    });

    // Delete OTP after success
    await otpModel.deleteMany({ email, purpose: "SIGNUP" });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.login = async (req, res) => {
  try {
    // * destructing data
    let { email, password, checked } = req.body;

    //* validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    //* find user
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    //* compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const expiresIn = checked ? "30d" : "1d";

    // Create token
    const token = jwt.sign(
      {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn },
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
      token,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
