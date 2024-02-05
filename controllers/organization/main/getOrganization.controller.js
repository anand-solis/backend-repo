const Organization = require("@/models/organization/organization.model");

const getOrganizationController = async (req, res) => {
    const { organization } = req.query;

    try {
        const organizationDetails = await Organization
            .findOne({ _id: organization })
            .select("-blocked -createdAt -updatedAt -__v");

        return res.status(200).json({ organizationDetails: organizationDetails, status: true, error: "", message: "Organization details fetched successfully." });
    } catch (error) {
        return res.status(500).json({ organizationDetails: null, status: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getOrganizationController;