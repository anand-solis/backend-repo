const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const siteMiddleware = require("@/utils/middleware/organization/siteMiddleware");
const organizationMiddleware = require("@/utils/middleware/organization/organizationMiddleware");

const router = express.Router();

const GetAllPurchaseOrderSettingController = require("@/controllers/organization/site/material/purchase-order/getAllPurchaseOrderSetting.controller");
const UpdatePurchaseOrderSettingController = require("@/controllers/organization/site/material/purchase-order/updatePurchaseOrderSetting.controller");

const key = "purchase-orders";
const plan = "material_management";

router.get(
    "/purchase-order/setting/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "read", plan),
    siteMiddleware,
    GetAllPurchaseOrderSettingController
);

router.patch(
    "/purchase-order/setting/update/:id",
    Middleware,
    (req, res, next) => organizationMiddleware(req, res, next, key, "update", plan),
    siteMiddleware,
    UpdatePurchaseOrderSettingController
);

module.exports = router;