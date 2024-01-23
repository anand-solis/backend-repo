const Site = require("@/models/organization/site/site.model");
const Plan = require("@/models/organization/plan.model");

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

        const createdSites = await Site.find({ organization : organization }).select("_id");
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

                return res.json({ site: newSiteResponse?._id, success: true, error: "", message: "Site successfully created." });
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