const mongoose = require("mongoose");

const RoleSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Role name is required."]
    }
}, { timestamps: true });

RoleSchema.pre("save", async function (next) {
    const role = this;
    const existingRole = await mongoose.model("Role").findOne({ name: role.name });

    if (existingRole) {
        next("Role name must be unique.");
    } else {
        next();
    }
});

module.exports = mongoose.model("Role", RoleSchema);