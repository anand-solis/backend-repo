const SiteMember = require("@/models/organization/site/siteMember.model");
const Member = require("@/models/organization/member.model");
const Site = require("@/models/organization/site/site.model");

const getAllSiteController = async (req, res) => {
    const { organization } = req.query;

    try {
        const member = await Member.findOne({ user: req.user._id, organization: organization }).select("_id");

        if(member?._id){

        let siteMembers = await SiteMember
            .find({ organization: organization, member: member._id })
            .select("site inviteAccepted");

            const haveSiteIds = siteMembers.map(member => member.site);

            const sites = await Site.find({ _id: { $in: haveSiteIds } }).select("name startDate endDate").sort({ createdAt: -1 });

            let siteWithInviteStatus = [];

            sites.map((site) => {
                const index = siteMembers ? siteMembers.findIndex(item => item.site.toString() == site._id.toString()) : -1;

                siteWithInviteStatus.push({
                    _id: site._id,
                    name: site.name,
                    startDate: site.startDate,
                    endDate: site.endDate,
                    inviteAccepted: siteMembers[index].inviteAccepted
                });
            })

            return res.status(200).json({ sites: siteWithInviteStatus, success: true, error: "", message: "Sites fetched successfully." });
        }
        else{
            return res.status(409).json({ success: false, error: "You are not in this organization.", message: "" });
        }
    } catch (error) {
        return res.status(500).json({ sites: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getAllSiteController;