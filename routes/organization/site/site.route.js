const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const getAllSiteController = require("@/controllers/organization/site/getAllSite.controller");
const createSiteController = require("@/controllers/organization/site/createSite.controller");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");
const getAllAddedSiteMemberController = require("@/controllers/organization/site/getAllAddedSiteMember.controller");
const getAllNotAddedSiteMemberController = require("@/controllers/organization/site/getAllNotAddedSiteMember.controller");

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
    "/site/members/invite",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    getAllNotAddedSiteMemberController
);

module.exports = router;