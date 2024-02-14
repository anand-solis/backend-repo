const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Site",
        required: true
    },
    floor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Floor",
        required: true
    },
    number: {
        type: Number,
        required: [true, "Task number is required."]
    },
    work_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WorkCategory",
        required: [true, "Task work category is required."]
    },
    endDate: {
        type: String,
        required: [true, "Task end date is required."]
    },
    startDate: {
        type: String,
        required: [true, "Task start date is required."]
    },
    budget: {
        type: Number,
        required: [true, "Task budget is required."]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);