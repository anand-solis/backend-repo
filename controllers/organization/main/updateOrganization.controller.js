const Organization = require("@/models/organization/organization.model");
const File = require("@/models/file/file.model");
const upload = require("@/utils/connections/storage/upload");

const updateOrganizationController = async (req, res) => {
    const { name, email, phone, address, city, state, pin_code, gst_number, pan_number, tan } = req.body;
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
                name: name,
                email: email,
                phone: phone,
                address: address,
                city: city,
                state: state,
                pin_code: pin_code,
                gst_number: gst_number,
                pan_number: pan_number,
                tan: tan
            }
        )

        return res.status(200).json({ success: true, error: "", message: "Organization details updated successfully." });

    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = updateOrganizationController;