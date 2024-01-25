const Site = require("@/models/organization/site/site.model");

const getAllSiteController = async (req, res) => {
    const { organization } = req.query;

    try {
        const sites = await Site
        .find({ organization: organization })
        .select("name startDate endDate createdBy")
        .populate({
            path: "createdBy",
            select: "name"
        });

        return res.status(200).json({ sites: sites, success: true, error: "", message: "Sites fetched successfully." });
    } catch (error) {
        return res.status(500).json({ sites: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getAllSiteController;