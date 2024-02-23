const upload = require("@/utils/connections/storage/upload");
const File = require("@/models/file/file.model");
const Site = require("@/models/organization/site/main/site.model");

const UpdateSiteController = async (req, res) => {
    const { name, startDate, endDate } = req.body;
    const { organization } = req.query;
    const { id } = req.params

    try {
        const response = await upload(req, ["image"]);

        if (response.success) {
            const prev = await Site.findOne({ _id: id, organization: organization }).select("profile");

            if (prev?.profile) {
                await File.findOneAndUpdate(
                    { organization: organization, _id: prev.profile },
                    { used: false }
                )
            }

            await Site.findOneAndUpdate(
                {
                    _id: id,
                    organization: organization
                },
                {
                    profile: response.file
                }
            )
        }

        await Site.findOneAndUpdate(
            {
                _id: id,
                organization: organization
            },
            {
                name: name,
                startDate: startDate,
                endDate: endDate,
            }
        )

        return res.status(200).json({ success: true, error: "", message: "Site details updated successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdateSiteController;