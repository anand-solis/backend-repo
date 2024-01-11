const express = require("express");
const ProfileController = require("@/controllers/profile/profile.controller");
const CheckNewUserController = require("@/controllers/profile/checkNewUser.controller");
const Middleware = require("@/utils/middleware/middleware");

const router = express.Router();

router.patch("/profile", Middleware, ProfileController);
router.get("/profile/new", Middleware, CheckNewUserController);

module.exports = router;