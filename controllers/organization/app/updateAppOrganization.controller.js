const Organization = require("@/models/organization/organization.model");

const UpdateAppOrganizationController = async (req, res) => {
    const { id } = req.params;
    const { blocked } = req.body;

    try {
        await Organization.findOneAndUpdate(
            { _id: id },
            { blocked: blocked }
        )

        return res.status(200).json({ status: true, error: "", message: `Organization ${blocked ? "blocked" : "unblocked"} successfully.` });
    } catch (error) {
        return res.status(500).json({ status: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = UpdateAppOrganizationController;