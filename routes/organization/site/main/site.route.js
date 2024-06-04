const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const GetAllSiteController = require("../../../../controllers/organization/site/main/getAllSite.controller");
const GetSiteController = require("../../../../controllers/organization/site/main/getSite.controller");
const CreateSiteController = require("../../../../controllers/organization/site/main/createSite.controller");
const UpdateSiteController = require("../../../../controllers/organization/site/main/updateSite.controller");
const addSiteMembers = require("../../../../controllers/organization/site/main/addSiteMembers.controller")

const router = express.Router();

const key = "sites";
const plan = "project_management";

router.get(
    "/sites",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    GetAllSiteController
);

router.get(
    "/site",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    GetSiteController
);

router.post(
    "/site/add",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    CreateSiteController
);

router.patch(
    "/site/update",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "update", plan),
    siteMiddleware,
    UpdateSiteController
);
router.put(
    "/site/mebers",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    addSiteMembers
);

module.exports = router;