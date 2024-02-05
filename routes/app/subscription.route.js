const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const superAdminMiddleware = require("@/utils/middleware/superAdminMiddleware");

const GetSubscriptionsCountController = require("../../controllers/app/subscription/getSubscriptionsCount.controller");

const router = express.Router();

router.get(
    "/subscriptions/count",
    Middleware,
    superAdminMiddleware,
    GetSubscriptionsCountController
);

module.exports = router;