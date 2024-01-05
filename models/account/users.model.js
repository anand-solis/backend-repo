const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: [true, "Email must be unique."],
        lowercase: true,
        match: [
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Please enter a valid email address."
        ]
    },
    phone: {
        type: String,
        required: [true, "Phone Number is required."],
        unique: [true, "Phone Number must be unique."],
        match: [ // Phone number validation (simplified for illustration)
            /^\d{10}$/,
            "Please enter a valid 10-digit phone number."
        ]
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