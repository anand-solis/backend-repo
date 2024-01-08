const OTP = require("@/models/account/otp.model");
const validateParam = require("@/controllers/otp/validateParam.controller");
const generateCode = require("@/controllers/otp/generateCode.controller");
const EmailController = require("@/controllers/email/email.controller");
const SMSController = require("@/controllers/sms/sms.controller");

const OTPController = async (req, res) => {
    const { param } = req.body;
    const paramType = validateParam(param);
    const code = generateCode();

    if (paramType.success) {
        try {
            const otp = await OTP({ otp: code, type: paramType.type, param: param });
            otp.save();

            if (paramType.type == "email") {
                const sendEmail = await EmailController(param, "Verification OTP", code);
                return res.json({ success: sendEmail.success, error: sendEmail.error, message: sendEmail.message });
            }
            else if (paramType.type == "phone") {
                const sendSMS = await SMSController(param, code);
                return res.json({ success: sendSMS.success, error: sendSMS.error, message: sendSMS.message });
            }
        } catch (error) {
            return res.json({ success: false, error: `Error: ${error}`, message: "" });
        }
    }
    else {
        return res.json({ success: false, error: `Error: Email or Mobile Number is not valid.`, message: "" });
    }
}

module.exports = OTPController;