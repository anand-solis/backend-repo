const Role = require("@/models/app/roles.model");

const editRoleController = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    try {
        await Role.findOneAndUpdate(
            { _id: id },
            { name: name }
        )

        return res.status(200).json({ success: true, error: "", message: "Role updated successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = editRoleController;