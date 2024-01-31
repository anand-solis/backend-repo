const SiteMember = require("@/models/organization/site/siteMember.model");

const inviteAcceptSiteMemberController = async (req, res) => {
    const { organization, site } = req.query;

    try {
        const siteMembers = await SiteMember.find(
            { site: site }
        ).populate({
            path: "member",
            match: {
                user: req.user._id,
                organization: organization
            },
            select: "_id"
        });

        const siteMember = siteMembers.filter(item => item.member != null);

        if(siteMember.length > 0){
            await SiteMember.findOneAndUpdate(
                { _id: siteMember[0]._id, site: site },
                { inviteAccepted: true }
            )

            return res.status(200).json({ success: true, error: "", message: "You successfully accept the site project invitation." });
        }
        else{
            return res.status(409).json({ success: false, error: "You are not in this site project.", message: "" });
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = inviteAcceptSiteMemberController;