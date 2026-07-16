const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const {
  profile,
  searchProfiles,
  allProfiles,
} = require("../../controllers/profileControlller/profile");

const router = express.Router();

router.get("/me", profile);

router.get("/search-users", searchProfiles);

router.get("/all-users", allProfiles);

module.exports = router;
