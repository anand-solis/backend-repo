const express = require("express");
const OTPController = require("@/controllers/otp/otp.controller");
const PublicMiddleware = require("@/utils/middleware/publicMiddleware");

const router = express.Router();

router.post("/otp", PublicMiddleware, OTPController);

module.exports = router;