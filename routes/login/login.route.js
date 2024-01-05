const express = require("express");
const LoginController = require("@/controllers/login/login.controller");
const Middleware = require("@/utils/middleware");

const router = express.Router();

router.post("/login", Middleware, LoginController);

module.exports = router;