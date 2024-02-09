const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const getAllSiteController = require("../../../controllers/organization/site/main/getAllSite.controller");
const createSiteController = require("../../../controllers/organization/site/main/createSite.controller");

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

module.exports = router;