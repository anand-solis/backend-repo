const AddPurchaseOrder = require("@/controllers/organization/site/commercial/addPO.controller");
const GetPurchaseOrder = require("@/controllers/organization/site/commercial/getPO.controller");
const Middleware = require("@/utils/middleware/middleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const express = require("express")
const router = express.Router();


plan= "material_management"
key = "purchase-order"

router.post(
 "/purchaseOrder/add",
 Middleware,
 (req, res, next) =>
   organizationMiddleware(req, res, next, key, "insert", plan),
 siteMiddleware,
 AddPurchaseOrder
);

router.get(
 "/purchaseOrder/get",
 Middleware,
 (req, res, next) =>
   organizationMiddleware(req, res, next, key, "insert", plan),
 siteMiddleware,
 GetPurchaseOrder
);

module.exports = router