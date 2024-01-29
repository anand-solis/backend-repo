const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");
const getAllSiteController = require("../../controllers/organization/site/getAllSite.controller");
const createSiteController = require("../../controllers/organization/site/createSite.controller");
const getAllAddedSiteMemberController = require("../../controllers/organization/site/member/main/getAllAddedSiteMember.controller");
const getAllNotAddedSiteMemberController = require("../../controllers/organization/site/member/main/getAllNotAddedSiteMember.controller");
const inviteSiteMemberController = require("../../controllers/organization/site/member/invite/inviteSiteMember.controller");

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
    "/site/member/invite",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    inviteSiteMemberController
);

module.exports = router;