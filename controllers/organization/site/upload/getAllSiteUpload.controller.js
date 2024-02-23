const SiteUpload = require("@/models/organization/site/siteUpload.model");

const GetAllSiteUploadController = async (req, res) => {
    const { organization, site } = req.query;

    try {
        const siteUploads = await SiteUpload.find({
            organization: organization,
            site: site
        })
        .select("attachment")
        .populate({
            path: "attachment",
            select: "url"
        });

        return res.status(200).json({ siteUploads: siteUploads, success: true, error: "", message: "Site uploads successfully fetched." });
    } catch (error) {
        return res.status(500).json({ siteUploads: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = GetAllSiteUploadController;