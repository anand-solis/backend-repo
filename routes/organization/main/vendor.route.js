const express = require("express");
const router = express.Router();
const Middleware = require("@/utils/middleware/middleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");
const {
  addVendorDetails,
  addvendorFinancialDetails,
  addTermsandConditionDetails,
  uploadproof,
} = require("@/controllers/organization/vendor/addVendor");

const getAllvendors = require("@/controllers/organization/vendor/getAllVendors")

const key = "vendor";
const plan = "vendor_payable";

router.get(
  "/vendors",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "read", plan),
    getAllvendors
);

router.post(
  "/vendor/adddetails",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
  addVendorDetails
);
router.post(
  "/vendor/addfinancial",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
  addvendorFinancialDetails
);
router.post(
  "/vendor/addtermsandcondition",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
  addTermsandConditionDetails
);
router.post(
  "/vendor/uploadproof",
  Middleware,
  (req, res, next) =>
    organizationMiddleware(req, res, next, key, "insert", plan),
  uploadproof
);

module.exports = router;
