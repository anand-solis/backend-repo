const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");
const getAllMemberController = require("../../controllers/organization/member/getAllMember.controller");
const inviteMemberController = require("../../controllers/organization/member/inviteMember.controller");
const updateMemberController = require("../../controllers/organization/member/updateMember.controller");

const router = express.Router();

const key = "members";
const plan = "admin_settings";

router.get(
    "/members",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    getAllMemberController
);

router.post(
    "/member/invite",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "insert", plan),
    inviteMemberController
);

router.patch(
    "/member/update/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "update", plan),
    updateMemberController
);

module.exports = router;