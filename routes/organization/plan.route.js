const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");
const getPlanController = require("../../controllers/organization/plan/getPlan.controller");

const router = express.Router();

const key = "organization-profile-and-plans";
const plan = "admin_settings";

router.get(
    "/plan",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    getPlanController
);

module.exports = router;