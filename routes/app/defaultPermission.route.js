const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const superAdminMiddleware = require("@/utils/middleware/superAdminMiddleware");
const getAllDefaultPermissionController = require("../../controllers/app/defaultPermission/getAllDefaultPermission.controller");
const getDefaultPermissionController = require("../../controllers/app/defaultPermission/getDefaultPermission.controller");
const createDefaultPermissionController = require("../../controllers/app/defaultPermission/createDefaultPermission.controller");
const updateDefaultPermissionController = require("../../controllers/app/defaultPermission/updateDefaultPermission.controller");

const router = express.Router();

router.get(
    "/default-permissions",
    Middleware,
    superAdminMiddleware,
    getAllDefaultPermissionController
);

router.get(
    "/default-permission/:id",
    Middleware,
    superAdminMiddleware,
    getDefaultPermissionController
);

router.post(
    "/default-permission/add",
    Middleware,
    superAdminMiddleware,
    createDefaultPermissionController
);

router.patch(
    "/default-permission/update",
    Middleware,
    superAdminMiddleware,
    updateDefaultPermissionController
);

module.exports = router;