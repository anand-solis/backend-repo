const express = require("express");
const RoleController = require("../../controllers/app/role/role.controller");
const addRoleController = require("../../controllers/app/role/addRole.controller");
const Middleware = require("@/utils/middleware/middleware");
const superAdminMiddleware = require("@/utils/middleware/superAdminMiddleware");

const router = express.Router();

router.get("/roles", Middleware, RoleController);

router.post(
    "/role/add",
    Middleware,
    superAdminMiddleware,
    addRoleController
);

module.exports = router;