const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
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
    type: {
        type: String, // Employee, Labour
        required: [true, "Type is required."]
    },
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    number: {
        type: Number,
        required: [true, "Phone number is required."]
    },
    role: {
        type: String,
        required: false
    },
    dailyHours: {
        type: Number,
        required: false
    },
    payment: {
        type: Number,
        required: [true, "Payment number is required."]
    },
    skills: {
        type: Boolean, // false -> Unskilled, true -> Skilled
        required: true,
        default: false
    },
    gender: {
        type: Boolean, // false -> Male, true -> Female
        required: true,
        default: false
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Employee", EmployeeSchema);