const sendSMSController = require("@/controllers/sms/sendSMS.controller");

const SMSController = async (req, res) => {
    const { number, content } = req.body;

    const send = await sendSMSController(number, content);

    return res.json({ success: send.success, error: send.error, message: send.message });
}

module.exports = SMSController;