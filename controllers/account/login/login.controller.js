const OTPExpiryValidation = require("@/controllers/account/login/OTPExpiryValidation.controller");
const AssignJWTToken = require("@/controllers/account/login/AssignToken.controller");
const User = require("@/models/account/users.model");
const OTP = require("@/models/account/otp.model");

const LoginController = async (req, res) => {
    try {
        const { param, otp } = req.body;

        const OTPResponse = await OTP.findOne({ otp: otp, param: param }).select("type param createdAt");

        if (OTPResponse?._id) {
            const notExpire = OTPExpiryValidation(OTPResponse.createdAt);

            if (notExpire.success && !notExpire.expire) {
                let findOptions = {};

                if(OTPResponse.type == "email") {
                    findOptions = {
                        "email.address": OTPResponse.param
                    };
                }
                else if(OTPResponse.type == "phone"){
                    findOptions = {
                        "phone.number": OTPResponse.param
                    };
                }

                const UserResponse = await User.findOne(findOptions);

                if(UserResponse?._id){
                    const assigned = await AssignJWTToken(UserResponse);

                    if(assigned.success) await OTP.deleteMany({ param: param });

                    return res.json({ success: assigned.success, error: assigned.error, token: assigned.token });
                }
                else{
                    if(OTPResponse.type == "email") {
                        AddUserDetails = {
                            email: {
                                address: OTPResponse.param,
                                isValid: true
                            }
                        };
                    }
                    else if(OTPResponse.type == "phone"){
                        AddUserDetails = {
                            phone: {
                                number: OTPResponse.param,
                                isValid: true
                            }
                        };
                    }

                    const AddedUser = await User.create(AddUserDetails);
                    const assigned = await AssignJWTToken(AddedUser);

                    if(assigned.success) await OTP.deleteMany({ param: param });

                    return res.json({ success: assigned.success, error: assigned.error, token: assigned.token });
                }
            }
            else {
                return res.json({ success: false, error: "OTP is expired." });
            }
        }
        else {
            return res.json({ success: false, error: "OTP Not found in the database" });
        }
    } catch (error) {
        return res.json({ success: false, error: `Error: ${error}` });
    }
}

module.exports = LoginController;