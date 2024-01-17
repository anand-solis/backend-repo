const express = require("express");
const SMSController = require("@/controllers/app/sms/sms.controller");
const PublicMiddleware = require("@/utils/middleware/publicMiddleware");

const router = express.Router();

router.post("/sms", PublicMiddleware, SMSController);

module.exports = router;