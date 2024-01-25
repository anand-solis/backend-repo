const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const getAllSiteController = require("@/controllers/organization/site/member/main/getAllSite.controller");
const createSiteController = require("@/controllers/organization/site/createSite.controller");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");
const getAllAddedSiteMemberController = require("@/controllers/organization/site/member/main/getAllAddedSiteMember.controller");
const getAllNotAddedSiteMemberController = require("@/controllers/organization/site/member/main/getAllNotAddedSiteMember.controller");
const inviteMemberByMobileController = require("@/controllers/organization/site/member/invite/inviteMemberByMobile.controller");
const inviteMemberByDesktopController = require("@/controllers/organization/site/member/invite/inviteMemberByDesktop.controller");

const router = express.Router();

const key = "sites";
const plan = "project_management";

router.get(
    "/sites",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    getAllSiteController
);

router.post(
    "/site/add",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    createSiteController
);

router.get(
    "/site/members",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    getAllAddedSiteMemberController
);

router.get(
    "/site/not-members",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    getAllNotAddedSiteMemberController
);

router.post(
    "/site/member/invite/mobile",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    inviteMemberByMobileController
);

router.post(
    "/site/member/invite/desktop",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    inviteMemberByDesktopController
);

module.exports = router;