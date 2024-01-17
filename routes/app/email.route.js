const express = require("express");
const EmailController = require("@/controllers/app/email/email.controller");
const PublicMiddleware = require("@/utils/middleware/publicMiddleware");

const router = express.Router();

router.post("/email", PublicMiddleware, EmailController);

module.exports = router;