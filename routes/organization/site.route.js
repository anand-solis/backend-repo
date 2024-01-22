const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const getAllSiteController = require("@/controllers/organization/site/getAllSite.controller");
const createSiteController = require("@/controllers/organization/site/createSite.controller");

const router = express.Router();

router.get("/sites", Middleware, getAllSiteController);
router.post("/site/add", Middleware, createSiteController);

module.exports = router;