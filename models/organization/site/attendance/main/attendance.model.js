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
    calendar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Calendar",
        required: true
    },
    availability: {
        type: Number,
        required: true,
        default: 0 // 0 -> Absent, 1 -> Present & 2 -> Half day
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Attendance", AttendanceSchema);