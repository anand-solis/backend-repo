const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const organizationMiddleware = require("@/utils/middleware/organizationMiddleware");
const getAllPermissionController = require("@/controllers/organization/permission/getAllPermission.controller");
const getPermissionController = require("@/controllers/organization/permission/getPermission.controller");
const createPermissionController = require("@/controllers/organization/permission/createPermission.controller");
const updatePermissionController = require("@/controllers/organization/permission/updatePermission.controller");

const router = express.Router();

router.get("/permission", Middleware, getAllPermissionController);
router.get("/permission:id", Middleware, getPermissionController);
router.post("/permission", Middleware, organizationMiddleware, createPermissionController);
router.patch("/permission", Middleware, updatePermissionController);

module.exports = router;