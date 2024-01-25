const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");
const getAllMemberController = require("@/controllers/organization/member/getAllMember.controller");

const router = express.Router();

const key = "members";
const plan = "admin_settings";

router.get(
    "/members",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    getAllMemberController
);

module.exports = router;