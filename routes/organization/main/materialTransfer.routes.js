const express = require("express");
const router = express.Router();
const Middleware = require("@/utils/middleware/middleware");
const organizationMemberMiddleware = require("@/utils/middleware/organization/organizationMemberMiddleware");

const {addMaterialtransfer,
  attachFileMaterialtransfer,
  getMaterialtransfer,
  deleteMaterialtransfer,
  updateMaterialtransfer
}  = require("@/controllers/organization/materialTransfer.controllers");
const key = "bill-of-quantity";
const plan = "budget_calculation";

router.post(
  "/meterialRransfer/add",
  Middleware,
  (req, res, next) => organizationMemberMiddleware(req, res, next, true),
  addMaterialtransfer
);

router.post(
    "/meterialRransfer/addFile",
    Middleware,
    (req, res, next) => organizationMemberMiddleware(req, res, next, true),
    attachFileMaterialtransfer
  );

  router.get(
    "/meterialRransfer/get",
    Middleware,
    (req, res, next) => organizationMemberMiddleware(req, res, next, true),
    getMaterialtransfer
  );

  router.delete(
    "/meterialRransfer/delete",
    Middleware,
    (req, res, next) => organizationMemberMiddleware(req, res, next, true),
    deleteMaterialtransfer
  );

  router.put(
    "/meterialRransfer/update",
    Middleware,
    (req, res, next) => organizationMemberMiddleware(req, res, next, true),
    updateMaterialtransfer
  );


module.exports = router;
