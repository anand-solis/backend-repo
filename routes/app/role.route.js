const express = require("express");
const RoleController = require("@/controllers/role/role.controller");
const Middleware = require("@/utils/middleware/middleware");

const router = express.Router();

router.get("/roles", Middleware, RoleController);

module.exports = router;