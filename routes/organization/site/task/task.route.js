const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const taskMiddleware = require("@/utils/middleware/organization/taskMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const getAllTaskController = require("@/controllers/organization/site/task/getAllTask.controller");

const router = express.Router();

const key = "tasks";
const plan = "project_management";

router.get(
    "/tasks",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    getAllTaskController
);

module.exports = router;