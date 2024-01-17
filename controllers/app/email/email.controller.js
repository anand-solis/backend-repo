const sendEmailController = require("@/controllers/app/email/sendEmail.controller");

const EmailController = async (req, res) => {
    const { email, subject, content } = req.body;

    const send = await sendEmailController(email, subject, content);

    return res.json({ success: send.success, error: send.error, message: send.message });
}

module.exports = EmailController;