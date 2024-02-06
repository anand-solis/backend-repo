const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const superAdminMiddleware = require("@/utils/middleware/superAdminMiddleware");

const GetSubscriptionsCountController = require("../../controllers/app/subscription/getSubscriptionsCount.controller");
const GetAllSubscriptionsController = require("../../controllers/app/subscription/getAllSubscriptions.controller");

const router = express.Router();

router.get(
    "/subscriptions/count",
    Middleware,
    superAdminMiddleware,
    GetSubscriptionsCountController
);

router.get(
    "/subscriptions",
    Middleware,
    superAdminMiddleware,
    GetAllSubscriptionsController
);

module.exports = router;