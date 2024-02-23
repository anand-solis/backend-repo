const Organization = require("@/models/organization/organization.model");
const File = require("@/models/file/file.model");
const upload = require("@/utils/connections/storage/upload");

const updateOrganizationController = async (req, res) => {
    const { organization } = req.query;

    try {
        const response = await upload(req, ["image"]);

        if (response.success) {
            const prev = await Organization.findOne({ _id: organization }).select("profile");

            if(prev?.profile){
                await File.findOneAndUpdate(
                    { organization: organization, _id: prev.profile },
                    { used: false }
                )
            }
            
            await Organization.findOneAndUpdate(
                {
                    _id: organization
                },
                {
                    profile: response.file
                }
            )
        }

        await Organization.findOneAndUpdate(
            {
                _id: organization
            },
            {
                name: response?.fields?.name[0],
                email: response?.fields?.email[0],
                phone: response?.fields?.phone[0],
                address: response?.fields?.address[0],
                city: response?.fields?.city[0],
                state: response?.fields?.state[0],
                pin_code: response?.fields?.pin_code[0],
                gst_number: response?.fields?.gst_number[0],
                pan_number: response?.fields?.pan_number[0],
                tan: response?.fields?.tan[0]
            }
        )

        return res.status(200).json({ success: true, error: "", message: "Organization details updated successfully." });

    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = updateOrganizationController;