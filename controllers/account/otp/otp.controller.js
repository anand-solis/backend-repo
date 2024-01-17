const OTP = require("@/models/account/otp.model");
const validateParam = require("@/controllers/account/otp/validateParam.controller");
const generateCode = require("@/controllers/account/otp/generateCode.controller");
const sendEmailController = require("@/controllers/app/email/sendEmail.controller");
const sendSMSController = require("@/controllers/app/sms/sendSMS.controller");
const EmailVerificationOTP = require("@/templates/emails/EmailVerificationOTP.template");
const SMSVerificationOTP = require("@/templates/sms/SMSVerificationOTP.template");

const OTPController = async (req, res) => {
    const { param } = req.body;
    const paramType = validateParam(param);
    const code = generateCode();

    if (paramType.success) {
        try {
            const otp = await OTP({ otp: code, type: paramType.type, param: param });
            await otp.save();

            if (paramType.type == "email") {
                const sendEmail = await sendEmailController(param, "Verification OTP", EmailVerificationOTP(code));
                return res.json({ success: sendEmail.success, error: sendEmail.error, message: sendEmail.message });
            }
            else if (paramType.type == "phone") {
                const sendSMS = await sendSMSController(param, SMSVerificationOTP(code));
                return res.json({ success: sendSMS.success, error: sendSMS.error, message: sendSMS.message });
            }
        } catch (error) {
            return res.json({ success: false, error: `Error: ${error}`, message: "" });
        }
    }
    else {
        return res.json({ success: false, error: `Email / Mobile Number is not valid.`, message: "" });
    }
}

module.exports = OTPController;