const mongoose = require("mongoose");

const RoleSchema = mongoose.Schema({
    name: {
        type: String,
        unique: [true, "Role name must be unique."],
        required: [true, "Role name is required."]
    }
}, { timestamps: true });

module.exports = mongoose.model("Role", RoleSchema);