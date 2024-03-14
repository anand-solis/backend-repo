const mongoose = require("mongoose");

const OTPSchema = mongoose.Schema({
    otp: {
        type: String,
        required: [true, "OTP is required."]
    },
    value: {
        type: String,
        required: [true, "Phone No. is required."]
    },
    type: {
        type: String,
        required: [true, "Value type is required."]
    },
}, { timestamps: true });

module.exports = mongoose.model("OTP", OTPSchema);