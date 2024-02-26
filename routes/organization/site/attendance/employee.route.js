const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const router = express.Router();

const GetAllEmployeeController = require("@/controllers/organization/site/attendance/employee/getAllEmployee.controller");
const GetEmployeeController = require("@/controllers/organization/site/attendance/employee/getEmployee.controller");
const AddEmployeeController = require("@/controllers/organization/site/attendance/employee/addEmployee.controller");
const UpdateEmployeeController = require("@/controllers/organization/site/attendance/employee/updateEmployee.controller");

const key = "attendance";
const plan = "labour_tracking_and_payable";

router.get(
    "/employees",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    GetAllEmployeeController
);

router.get(
    "/employee/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    GetEmployeeController
);

router.post(
    "/employee/add",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    AddEmployeeController
);

router.patch(
    "/employee/update/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "update", plan),
    siteMiddleware,
    UpdateEmployeeController
);

module.exports = router;