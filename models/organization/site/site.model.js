const mongoose = require("mongoose");

const SiteSchema = mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    name: {
        type: String,
        required: [true, "Site name is required."]
    },
    startDate: {
        type: Date,
        required: [true, "Site start date is required."]
    },
    endDate: {
        type: String,
        required: [true, "Site end date is required."]
    },
    banner: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("Site", SiteSchema);