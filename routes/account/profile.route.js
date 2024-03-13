const express = require("express");
const ProfileController = require("../../controllers/account/profile/profile.controller");
const CheckNewUserController = require("../../controllers/account/profile/checkNewUser.controller");
const GetProfileController = require("../../controllers/account/profile/getProfile.controller");
const UpdateProfileController = require("../../controllers/account/profile/updateProfile.controller");
const SendOTPVerifyPhoneProfileController = require("../../controllers/account/profile/sendOTPVerifyPhoneProfile.controller");
const VerifyPhoneProfileController = require("../../controllers/account/profile/verifyPhoneProfile.controller");
const SendOTPVerifyEmailProfileController = require("../../controllers/account/profile/sendOTPVerifyEmailProfile.controller");
const VerifyEmailProfileController = require("../../controllers/account/profile/verifyEmailProfile.controller");

const Middleware = require("@/utils/middleware/middleware");

const router = express.Router();

router.patch(
    "/setting-up-account",
    Middleware,
    ProfileController
);

router.get(
    "/profile/new",
    Middleware,
    CheckNewUserController
);

router.get(
    "/profile/me",
    Middleware,
    GetProfileController
);

router.patch(
    "/profile/update/default",
    Middleware,
    UpdateProfileController
);

router.patch(
    "/profile/verify/phone/send-otp",
    Middleware,
    SendOTPVerifyPhoneProfileController
);

router.patch(
    "/profile/verify/phone",
    Middleware,
    VerifyPhoneProfileController
);

router.patch(
    "/profile/verify/email/send-otp",
    Middleware,
    SendOTPVerifyEmailProfileController
);

router.patch(
    "/profile/verify/email",
    Middleware,
    VerifyEmailProfileController
);

module.exports = router;