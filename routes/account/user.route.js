const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const superAdminMiddleware = require("@/utils/middleware/superAdminMiddleware");
const GetUsersCountController = require("../../controllers/account/user/getUsersCount.controller");

const router = express.Router();

router.get(
    "/users/count",
    Middleware,
    superAdminMiddleware,
    GetUsersCountController
);

module.exports = router;