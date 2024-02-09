const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const GetAllFloorController = require("../../../controllers/organization/site/floor/getAllFloor.controller");

const router = express.Router();

const key = "sites";
const plan = "project_management";

router.get(
    "/site/floors",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    GetAllFloorController
);

module.exports = router;