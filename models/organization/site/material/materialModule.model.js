const mongoose = require("mongoose");

const MaterialModuleSettingSchema = mongoose.Schema({
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
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SiteMember",
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("MaterialModuleSetting", MaterialModuleSettingSchema);