const nodemailer = require("nodemailer");

const EmailController = async (email, subject, content) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const emailContent = {
        from: `"${process.env.SMTP_FROM}" <${process.env.SMTP_USERNAME}>`,
        to: email,
        subject: subject,
        html: content,
    };

    try {
        await transporter.sendMail(emailContent);
        return { success: true, error: "", message: "Email sent successfully." };
    } catch (error) {
        return { success: true, error: `Error: ${error}`, message: "" };
    }
}

module.exports = EmailController;