const express = require("express");
const ProfileController = require("../../controllers/account/profile/profile.controller");
const CheckNewUserController = require("../../controllers/account/profile/checkNewUser.controller");
const getProfileController = require("../../controllers/account/profile/getProfile.controller");
const updateProfileController = require("../../controllers/account/profile/updateProfile.controller");

const Middleware = require("@/utils/middleware/middleware");

const router = express.Router();

router.patch("/setting-up-account", Middleware, ProfileController);
router.get("/profile/new", Middleware, CheckNewUserController);
router.get("/profile/me", Middleware, getProfileController);
router.patch("/profile/update", Middleware, updateProfileController);

module.exports = router;