const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const superAdminMiddleware = require("@/utils/middleware/superAdminMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const router = express.Router();

const key = "organization-profile";
const plan = "admin_settings";

module.exports = router;