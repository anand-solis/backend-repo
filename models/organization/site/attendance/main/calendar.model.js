const mongoose = require("mongoose");

const CalendarSchema = mongoose.Schema({
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
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Calendar", CalendarSchema);