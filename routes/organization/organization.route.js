const express = require("express");
const OrganizationController = require("../../controllers/organization/main/organization.controller");
const getOrganizationSwitchController = require("../../controllers/organization/main/getOrganizationSwitch.controller");
const getOrganizationController = require("../../controllers/organization/main/getOrganization.controller");
const updateOrganizationController = require("../../controllers/organization/main/updateOrganization.controller");

const Middleware = require("@/utils/middleware/middleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const router = express.Router();

const key = "organization-profile-and-plans";
const plan = "admin_settings";

router.get(
    "/organization/get",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    getOrganizationController
);

router.patch(
    "/organization/update",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "update", plan),
    updateOrganizationController
);

router.get(
    "/organization/switch",
    Middleware,
    getOrganizationSwitchController
);

router.post("/organization/add", Middleware, OrganizationController);

module.exports = router;