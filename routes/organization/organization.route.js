const express = require("express");
const OrganizationController = require("../../controllers/organization/main/organization.controller");
const getOrganizationSwitchController = require("../../controllers/organization/main/getOrganizationSwitch.controller");

const Middleware = require("@/utils/middleware/middleware");

const router = express.Router();

router.get(
    "/organization/switch",
    Middleware,
    getOrganizationSwitchController
);

router.post("/organization/add", Middleware, OrganizationController);

module.exports = router;