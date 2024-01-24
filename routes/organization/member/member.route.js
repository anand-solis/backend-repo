const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");
const getAllMemberController = require("@/controllers/organization/member/main/getAllMember.controller");

const router = express.Router();

const organization_key = "members";
const organization_plan = "admin_settings";

router.get(
    "/members",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, organization_key, "read", organization_plan),
    getAllMemberController
);

module.exports = router;