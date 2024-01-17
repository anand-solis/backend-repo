const mongoose = require("mongoose");

const FeatureSchema = mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Feature", FeatureSchema);