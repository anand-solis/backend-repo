const SiteMember = require("@/models/organization/site/main/siteMember.model");
const Member = require("@/models/organization/member.model");
const Site = require("@/models/organization/site/main/site.model");
const TaskTimeline = require("@/models/organization/site/task/taskTimeline.model");

const getAllSiteController = async (req, res) => {
    const { organization } = req.query;

    try {
        const member = await Member.findOne({ user: req.user._id, organization: organization }).select("_id");

        if (member?._id) {

            let siteMembers = await SiteMember
                .find({ organization: organization, member: member._id })
                .select("site inviteAccepted");

            const haveSiteIds = siteMembers.map(member => member.site);

            const sites = await Site
                .find({ _id: { $in: haveSiteIds } })
                .select("name startDate endDate profile")
                .sort({ createdAt: -1 })
                .populate("profile", { url: 1, _id: 0 });

            let siteWithInviteStatus = [];

            for (const site of sites) {
                const index = siteMembers ? siteMembers.findIndex(item => item.site.toString() == site._id.toString()) : -1;

                const taskTimelines = await TaskTimeline
                    .find({ organization: organization, site: site._id })
                    .select("progress");

                let count = 0;
                let progress = 0;

                taskTimelines.forEach((timeline) => {
                    count += 1;
                    progress += timeline.progress;
                });

                siteWithInviteStatus.push({
                    _id: site._id,
                    name: site.name,
                    startDate: site.startDate,
                    endDate: site.endDate,
                    profile: site?.profile,
                    progress: count > 0 ? parseInt(progress / count) : 0,
                    inviteAccepted: index !== -1 ? siteMembers[index].inviteAccepted : false
                });
            }

            return res.status(200).json({ sites: siteWithInviteStatus, success: true, error: "", message: "Sites fetched successfully." });
        } else {
            return res.status(409).json({ success: false, error: "You are not in this organization.", message: "" });
        }
    } catch (error) {
        return res.status(500).json({ sites: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getAllSiteController;