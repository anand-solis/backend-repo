const SMSController = async (number, content) => {
    return { success: true, error: "", message: "OTP send successfully via SMS." };
}

module.exports = SMSController;