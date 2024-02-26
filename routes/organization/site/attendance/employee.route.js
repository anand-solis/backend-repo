const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const router = express.Router();

const key = "attendance";
const plan = "labour_tracking_and_payable";


module.exports = router;