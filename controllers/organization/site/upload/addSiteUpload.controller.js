const SiteUpload = require("@/models/organization/site/main/siteUpload.model");
const upload = require("@/utils/connections/storage/upload");

const AddSiteUploadController = async (req, res) => {
    const { organization, site } = req.query;

    try {
        const response = await upload(req, ["image", "application", "video"]);
        console.log(response)

        if (response?.success) {
            await SiteUpload.create({
                organization: organization,
                site: site,
                attachment: response.file,
                createdBy: req.user._id
            })

            return res.status(201).json({ success: true, error: "", message: "Site uploads successfully created." });
        }
        else {
            return res.status(200).json({ success: response?.success, error: response?.error, message: response?.message });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = AddSiteUploadController;