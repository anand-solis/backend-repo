const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");
const getAllMemberController = require("../../controllers/organization/member/getAllMember.controller");
const inviteMemberByMobileController = require("../../controllers/organization/member/inviteMemberByMobile.controller");
const inviteMemberByDesktopController = require("../../controllers/organization/member/inviteMemberByDesktop.controller")

const router = express.Router();

const key = "members";
const plan = "admin_settings";

router.get(
    "/members",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    getAllMemberController
);

router.post(
    "/member/invite/mobile",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    inviteMemberByMobileController
);

router.post(
    "/member/invite/desktop",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    inviteMemberByDesktopController
);

module.exports = router;