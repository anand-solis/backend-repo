const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const router = express.Router();

const GetAttendanceController = require("@/controllers/organization/site/attendance/main/getAttendance.controller");
const AddAttendanceController = require("@/controllers/organization/site/attendance/main/addAttendance.controller");
const UpdateAttendanceController = require("@/controllers/organization/site/attendance/main/updateAttendance.controller");

const key = "attendance";
const plan = "labour_tracking_and_payable";

router.get(
    "/attendance/:date",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    GetAttendanceController
);

router.post(
    "/attendance/add",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    AddAttendanceController
);

router.patch(
    "/attendance/update/:date",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "update", plan),
    siteMiddleware,
    UpdateAttendanceController
);


module.exports = router;