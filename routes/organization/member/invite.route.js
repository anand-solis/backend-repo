const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const inviteMemberByMobileController = require("@/controllers/organization/member/inviteMemberByMobile.controller");
const inviteMemberByDesktopController = require("@/controllers/organization/member/inviteMemberByDesktop.controller");

const router = express.Router();

const key = "sites";
const plan = "project_management";

router.post(
    "/invite/mobile",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteInviteMiddleware,
    inviteMemberByMobileController
);

router.post(
    "/invite/desktop",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteInviteMiddleware,
    inviteMemberByDesktopController
);

module.exports = router;