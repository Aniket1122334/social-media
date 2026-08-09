const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const upload = require("../../middlewares/multer");
const {
  profile,
  searchProfiles,
  allProfiles,
  editProfile,
} = require("../../controllers/profileControlller/profile");

const router = express.Router();

router.get("/me", profile);

router.get("/search-users", searchProfiles);

router.get("/all-users", allProfiles);

router.put(
  "/edit-profile",

  upload.single("profilePicture"),
  editProfile,
);

module.exports = router;
