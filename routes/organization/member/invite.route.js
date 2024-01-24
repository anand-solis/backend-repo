const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const inviteMemberByMobileController = require("@/controllers/organization/member/invite/inviteMemberByMobile.controller");
const inviteMemberByDesktopController = require("@/controllers/organization/member/invite/inviteMemberByDesktop.controller");

const router = express.Router();

const key = "sites";
const plan = "project_management";

router.post(
    "/invite/mobile",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    inviteMemberByMobileController
);

router.post(
    "/invite/desktop",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    inviteMemberByDesktopController
);

module.exports = router;