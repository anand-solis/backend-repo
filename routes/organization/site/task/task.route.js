const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const taskMiddleware = require("@/utils/middleware/organization/taskMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const GetAllTaskController = require("../../../../controllers/organization/site/task/getAllTask.controller");
const GetTaskController = require("../../../../controllers/organization/site/task/getTask.controller");
const AddTaskController = require("../../../../controllers/organization/site/task/addTask.controller");

const router = express.Router();

const key = "tasks";
const plan = "project_management";

router.get(
    "/tasks",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    GetAllTaskController
);

router.get(
    "/task",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    taskMiddleware,
    GetTaskController
);

router.post(
    "/task/add",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    AddTaskController
);

module.exports = router;