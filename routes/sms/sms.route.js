const express = require("express");
const SMSController = require("@/controllers/sms/sms.controller");
const PublicMiddleware = require("@/utils/middleware/publicMiddleware");

const router = express.Router();

router.post("/email", PublicMiddleware, SMSController);

module.exports = router;