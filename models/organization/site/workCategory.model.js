const mongoose = require("mongoose");

const WorkCategorySchema = mongoose.Schema({
    organization: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: [true, "Work Category name is required."],
        unique: true
    }
}, { timestamps: true });

module.exports = mongoose.model("WorkCategory", WorkCategorySchema);