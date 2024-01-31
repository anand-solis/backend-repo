const SiteMember = require("@/models/organization/site/siteMember.model");
const Site = require("@/models/organization/site/site.model");

const getAllSiteController = async (req, res) => {
    const { organization } = req.query;

    try {
        let siteMembers = await SiteMember
        .find({})
        .select("site member inviteAccepted")
        .populate({
            path: "member",
            select: "_id organization user"
        });

        siteMembers = siteMembers.filter(item => {
            return item.member.organization.toString() == organization.toString() && item.member.user.toString() == req.user._id.toString();
        })
        
        if(siteMembers.length == 0){
            return res.status(204).json({ sites: null, success: false, error: "You are not in any site project.", message: "" });
        }
        else{
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
    } catch (error) {
        return res.status(500).json({ sites: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getAllSiteController;