const Organization = require("@/models/organization/organization.model");

const getOrganizationSwitchController = async (req, res) => {
    try {
        const organizations = await Organization.find({}).select("name").sort({ createdAt: -1 });

        return res.json({ organizations: organizations, success: true, error: "", message: "Organizations records fetched successfully." });
    } catch (error) {
        return res.json({ organizations: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getOrganizationSwitchController;