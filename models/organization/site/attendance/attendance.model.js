const mongoose = require("mongoose");

const AttendanceSchema = mongoose.Schema({
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
    date: {
        type: Date,
        required: true
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Attendance", AttendanceSchema);