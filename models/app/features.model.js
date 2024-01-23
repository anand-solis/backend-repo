const mongoose = require("mongoose");

const FeatureSchema = mongoose.Schema({
    key: {
        type: String,
        required: [true, "Feature key is required."],
        unique: [true, "Feature key must be unique."]
    },
    name: {
        type: String,
        required: [true, "Feature name is required."],
        unique: [true, "Feature name must be unique."]
    },
    description: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Feature", FeatureSchema);