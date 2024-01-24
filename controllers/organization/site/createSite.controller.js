const Site = require("@/models/organization/site/site.model");
const Plan = require("@/models/organization/plan.model");
const Member = require("@/models/organization/member.model");
const SiteMember = require("@/models/organization/site/siteMember.model");

const createSiteController = async (req, res) => {
    const { name, startDate, endDate } = req.body;
    const { organization } = req.query;

    try {
        const plan = await Plan
            .findOne({ organization: organization })
            .select("subscription")
            .populate({
                path: "subscription",
                select: "sites_count"
            });

        const createdSites = await Site.find({ organization: organization }).select("_id");
        const createdSitesCount = createdSites.length;

        if (plan?.subscription?.sites_count) {
            if (createdSitesCount < plan?.subscription?.sites_count) {
                const newSite = new Site({
                    name: name,
                    startDate: startDate,
                    endDate: endDate,
                    organization: organization,
                    createdBy: req?.user?._id
                });

                const newSiteResponse = await newSite.save();

                if (newSiteResponse?._id) {
                    const OrganizationMember = await Member.findOne({ organization: organization }).select("user");

                    if (OrganizationMember?._id) {
                        const NewSiteMember = new SiteMember({
                            site: newSiteResponse?._id,
                            member: OrganizationMember.user,
                            isCreator: true,
                            inviteAccepted: true
                        })

                        await NewSiteMember.save();

                        return res.json({ site: newSiteResponse?._id, success: true, error: "", message: "Site successfully created." });
                    }
                    else{
                        return res.json({ site: null, success: false, error: "You are not a member of this organization.", message: "" });
                    }
                }
                else {
                    return res.json({ site: null, success: false, error: "Site not created.", message: "" });
                }
            }
            else {
                return res.json({ site: null, success: false, error: "Error: You exceed limit to create site in your organization, Upgrade your subscription plan.", message: "" });
            }
        }
        else {
            return res.json({ site: null, success: false, error: "Error: You don't have this features in your subscription plan.", message: "" });
        }

    } catch (error) {
        return res.json({ site: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = createSiteController;