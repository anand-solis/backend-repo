const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: [true, "Email must be unique."]
    },
    phone: {
        type: String,
        required: [true, "Phone Number is required."],
        unique: [true, "Phone Number must be unique."]
    },
    role: {
        type: String,
        required: [true, "Role is Required."]
    },
    blocked: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);