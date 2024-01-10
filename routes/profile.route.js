const express = require("express");
const ProfileController = require("@/controllers/profile/profile.controller");
const Middleware = require("@/utils/middleware/middleware");

const router = express.Router();

router.patch("/profile", Middleware, ProfileController);

module.exports = router;