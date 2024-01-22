const express = require("express");
const sendInviteController = require("@/controllers/organization/invite/sendInvite.controller");
const Middleware = require("@/utils/middleware/middleware");

const router = express.Router();

router.post("/send-invite", Middleware, sendInviteController);

module.exports = router;