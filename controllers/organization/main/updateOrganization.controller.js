const Organization = require("@/models/organization/organization.model");

const updateOrganizationController = async (req, res) => {
    const { name, email, phone, address, city, state, pin_code, gst_number, pan_number, tan } = req.body;
    const { organization } = req.query;

    try {
        await Organization.findOneAndUpdate(
            { _id: organization },
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