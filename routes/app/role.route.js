const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const superAdminMiddleware = require("@/utils/middleware/superAdminMiddleware");

const getRoleController = require("../../controllers/app/role/getRole.controller");
const addRoleController = require("../../controllers/app/role/addRole.controller");
const editRoleController = require("../../controllers/app/role/editRole.controller");
const removeRoleController = require("../../controllers/app/role/removeRole.controller");

const router = express.Router();

router.get("/roles", Middleware, getRoleController);

router.post(
    "/role/add",
    Middleware,
    superAdminMiddleware,
    addRoleController
);

router.patch(
    "/role/update/:id",
    Middleware,
    superAdminMiddleware,
    editRoleController
);

router.delete(
    "/role/remove/:id",
    Middleware,
    superAdminMiddleware,
    removeRoleController
);

module.exports = router;