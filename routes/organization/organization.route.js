const express = require("express");
const OrganizationController = require("@/controllers/organization/organization.controller");

const Middleware = require("@/utils/middleware/middleware");

const router = express.Router();

router.post("/organization", Middleware, OrganizationController);

module.exports = router;