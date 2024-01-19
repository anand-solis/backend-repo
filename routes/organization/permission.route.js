const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const organizationMiddleware = require("@/utils/middleware/organizationMiddleware");
const getAllPermissionController = require("@/controllers/organization/permission/getAllPermission.controller");
const getPermissionController = require("@/controllers/organization/permission/getPermission.controller");
const createPermissionController = require("@/controllers/organization/permission/createPermission.controller");
const updatePermissionController = require("@/controllers/organization/permission/updatePermission.controller");

const router = express.Router();

const key = "roles-and-permissions";
const plan = "admin_settings";

router.get(
    "/permission",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    getAllPermissionController
);

router.get(
    "/permission:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    getPermissionController
);

router.post(
    "/permission",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    createPermissionController
);

router.patch(
    "/permission",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "update", plan),
    updatePermissionController
);

module.exports = router;