const express = require("express");
const ProfileController = require("@/controllers/account/profile/profile.controller");
const CheckNewUserController = require("@/controllers/account/profile/checkNewUser.controller");
const Middleware = require("@/utils/middleware/middleware");

const router = express.Router();

router.patch("/profile", Middleware, ProfileController);
router.get("/profile/new", Middleware, CheckNewUserController);

module.exports = router;