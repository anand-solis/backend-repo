const RaiseIssuesController = require('@/controllers/organization/site/siteIssues/addIssues.controller');
const GetIssuesController = require('@/controllers/organization/site/siteIssues/getIssues.controller');
const Middleware = require('@/utils/middleware/middleware');
const organizationMiddleware = require('@/utils/middleware/organization/organizationMiddleware');
const siteMiddleware = require('@/utils/middleware/organization/siteMiddleware');
const express = require('express');
const router = express.Router()




router.post(
    "/issue/add",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    RaiseIssuesController
);
router.get(
    "/issue/get",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    siteMiddleware,
    GetIssuesController
);


module.exports = router