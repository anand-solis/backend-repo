const mongoose = require("mongoose");

const OTPSchema = mongoose.Schema({
    otp: {
        type: String,
        required: [true, "OTP is required."]
    },
    type: {
        type: String,
        required: [true, "Type is required."]
    },
    param: {
        type: String,
        required: [true, "Param is required."]
    }
}, { timestamps: true });

module.exports = mongoose.model("OTP", OTPSchema);