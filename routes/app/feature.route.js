const express = require("express");
const AddFeatureController = require("../../controllers/app/feature/addFeature.controller");
const RemoveFeatureController = require("../../controllers/app/feature/removeFeature.controller");
const Middleware = require("@/utils/middleware/middleware");
const superAdminMiddleware = require("@/utils/middleware/superAdminMiddleware");

const router = express.Router();

router.post(
    "/feature/add",
    Middleware,
    superAdminMiddleware,
    AddFeatureController
);

router.delete(
    "/feature/remove",
    Middleware,
    superAdminMiddleware,
    RemoveFeatureController
);

module.exports = router;