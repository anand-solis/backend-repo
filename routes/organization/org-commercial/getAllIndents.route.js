const express = require('express');
const GetAllIndents = require("@/controllers/organization/org-commercial/getAllIndent.controller");
const Middleware = require('@/utils/middleware/middleware');
const organizationMiddleware = require('@/utils/middleware/organization/organizationMiddleware');

const router = express.Router()

plan= "material_management"
key = "indent" 

router.get(
    "/allindents/get",
    Middleware,
    (req, res, next) =>
      organizationMiddleware(req, res, next, key, "insert", plan),
      GetAllIndents
  );

  module.exports = router;