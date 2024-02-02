const mongoose = require("mongoose");

const RoleSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Role name is required."],
        unique: [true, "Role name must be unique."]
    }
}, { timestamps: true });

module.exports = mongoose.model("Role", RoleSchema);