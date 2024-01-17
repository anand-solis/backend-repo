const express = require("express");
const MemberController = require("@/controllers/organization/member/member.controller");

const Middleware = require("@/utils/middleware/middleware");

const router = express.Router();

router.post("/organization", Middleware, OrganizationController);

module.exports = router;