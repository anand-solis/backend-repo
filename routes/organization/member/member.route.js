const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");
const getAllMemberController = require("@/controllers/organization/member/main/getAllMember.controller");
const getAllAddedSiteMemberController = require("@/controllers/organization/member/main/getAllAddedSiteMember.controller");
const getAllInviteSiteMemberController = require("@/controllers/organization/member/main/getAllInviteSiteMember.controller");

const router = express.Router();

const site_key = "sites";
const site_plan = "project_management";

const organization_key = "members";
const organization_plan = "admin_settings";

router.get(
    "/members",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, organization_key, "read", organization_plan),
    getAllMemberController
);

router.get(
    "/member/site",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, site_key, "insert", site_plan),
    siteMiddleware,
    getAllAddedSiteMemberController
);

router.get(
    "/member/site/invite",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, site_key, "insert", site_plan),
    siteMiddleware,
    getAllInviteSiteMemberController
);

module.exports = router;