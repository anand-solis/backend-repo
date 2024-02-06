const express = require("express");
const Middleware = require("@/utils/middleware/middleware");
const superAdminMiddleware = require("@/utils/middleware/superAdminMiddleware");

const GetSubscriptionsCountController = require("../../controllers/app/subscription/getSubscriptionsCount.controller");
const GetSubscriptionController = require("../../controllers/app/subscription/getSubscriptions.controller");
const GetAllSubscriptionsController = require("../../controllers/app/subscription/getAllSubscriptions.controller");
const AddSubscriptionController = require("../../controllers/app/subscription/addSubscription.controller");
const UpdateSubscriptionController = require("../../controllers/app/subscription/updateSubscription.controller");
const RemoveSubscriptionController = require("../../controllers/app/subscription/removeSubscription.controller");

const GetAssignFeaturesSubscriptionController = require("../../controllers/app/subscription/assign-features/getAssignFeaturesSubscription.controller");
const UpdateAssignFeaturesSubscriptionController = require("../../controllers/app/subscription/assign-features/updateAssignFeaturesSubscription.controller");

const router = express.Router();

router.get(
    "/subscriptions/count",
    Middleware,
    superAdminMiddleware,
    GetSubscriptionsCountController
);

router.get(
    "/subscriptions",
    Middleware,
    superAdminMiddleware,
    GetAllSubscriptionsController
);

router.get(
    "/subscription/:id",
    Middleware,
    superAdminMiddleware,
    GetSubscriptionController
);


router.post(
    "/subscription/add",
    Middleware,
    superAdminMiddleware,
    AddSubscriptionController
);

router.patch(
    "/subscription/update/:id",
    Middleware,
    superAdminMiddleware,
    UpdateSubscriptionController
);

router.delete(
    "/subscription/remove/:id",
    Middleware,
    superAdminMiddleware,
    RemoveSubscriptionController
);

router.get(
    "/subscription/assign-features",
    Middleware,
    superAdminMiddleware,
    GetAssignFeaturesSubscriptionController
);

router.patch(
    "/subscription/assign-features/:id",
    Middleware,
    superAdminMiddleware,
    UpdateAssignFeaturesSubscriptionController
);

module.exports = router;