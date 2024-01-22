const express = require("express");
const OTPController = require("@/controllers/account/otp/otp.controller");
const PublicMiddleware = require("@/utils/middleware/publicMiddleware");

const router = express.Router();

router.post("/send-otp", PublicMiddleware, OTPController);

module.exports = router;