const express = require("express");
const OrganizationController = require("@/controllers/organization/main/organization.controller");
const getOrganizationSwitchController = require("@/controllers/organization/main/getOrganizationSwitch.controller");
const organizationMemberMiddleware = require("@/utils/middleware/organization/organizationMemberMiddleware");

const Middleware = require("@/utils/middleware/middleware");

const router = express.Router();

router.get(
    "/organization/switch",
    Middleware,
    organizationMemberMiddleware,
    getOrganizationSwitchController
);

router.post("/organization/add", Middleware, OrganizationController);

module.exports = router;