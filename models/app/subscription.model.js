const mongoose = require("mongoose");

const SubscriptionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    sub_title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    sites_count: {
        type: Number,
        required: true,
        default: 0
    },
    project_management: {
        type: Boolean,
        required: true,
        default: false
    },
    material_management: {
        type: Boolean,
        required: true,
        default: false
    },
    labour_tracking_and_payable: {
        type: Boolean,
        required: true,
        default: false
    },
    vendor_payable: {
        type: Boolean,
        required: true,
        default: false
    },
    reports_and_dashboards: {
        type: Boolean,
        required: true,
        default: false
    },
    admin_settings: {
        type: Boolean,
        required: true,
        default: false
    },
    support: {
        type: Boolean,
        required: true,
        default: false
    },
    users_count: {
        type: Number,
        required: true,
        default: 0
    },
    expense: {
        type: Boolean,
        required: true,
        default: false
    },
    budget_calculation: {
        type: Boolean,
        required: true,
        default: false
    },
    isTrial: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Subscription", SubscriptionSchema);