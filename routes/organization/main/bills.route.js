const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const organizationMemberMiddleware = require("@/utils/middleware/organization/organizationMemberMiddleware");
const {
  addsiteBillsController,
  getsiteBillsController,
} = require("@/controllers/organization/bills/siteBills.controller");
const {
  CreateSiteExpenses,
  getSiteExpenses,
} = require("@/controllers/organization/bills/creteExpenses.controller");
const addExpenseBillController = require("@/controllers/organization/bills/addExpense.controller");
const getExpenseBill = require("@/controllers/organization/bills/getExpense.controller");

const router = express.Router();

const key = "bill-of-quantity";
const plan = "budget_calculation";

router.post(
  "/sitebudget/add",
  Middleware,
  (req, res, next) => organizationMemberMiddleware(req, res, next, true),
  addsiteBillsController
);
router.get(
  "/sitebudget/get",
  Middleware,
  (req, res, next) => organizationMemberMiddleware(req, res, next, true),
  getsiteBillsController
);
router.get(
  "/expenses/get",
  Middleware,
  (req, res, next) => organizationMemberMiddleware(req, res, next, true),
  getSiteExpenses
);
router.post(
  "/expenses/create",
  Middleware,
  (req, res, next) => organizationMemberMiddleware(req, res, next, true),
  CreateSiteExpenses
);
router.post(
  "/expense/bill/add",
  Middleware,
  (req, res, next) => organizationMemberMiddleware(req, res, next, true),
  addExpenseBillController
);
router.get(
  "/expense/bill/get",
  Middleware,
  (req, res, next) => organizationMemberMiddleware(req, res, next, true),
  getExpenseBill
);
module.exports = router;
