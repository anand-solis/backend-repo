const Site = require("@/models/organization/site/site.model");

const GetAllSiteController = async (req, res) => {
    const { organization, site } = req.query;

    try {
        const siteDetails = await Site
            .findOne({ _id: site, organization: organization })
            .select("name startDate endDate profile")
            .populate("profile", { url: 1, _id: 0 });

        return res.status(200).json({ site: siteDetails, success: true, error: "", message: "Site fetched successfully." });
    } catch (error) {
        return res.status(500).json({ site: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllSiteController;