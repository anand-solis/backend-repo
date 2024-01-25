const User = require("@/models/account/users.model");
const Member = require("@/models/organization/member.model");
const SiteMember = require("@/models/organization/site/siteMember.model");
const sendEmailController = require("@/controllers/app/email/sendEmail.controller");
const SiteInvite = require("@/templates/emails/SiteInvite.template");

const inviteSiteMemberByDesktopController = async (req, res) => {
    const { members } = req.body;

    try{

    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = inviteSiteMemberByDesktopController;