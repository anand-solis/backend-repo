const Role = require("@/models/account/roles.model");

const RoleController = async (req, res) => {
    try {
        const roles = await Role.find({}).select("name").sort({ createdAt: -1 });

        return res.status(200).json({ roles: roles, success: true, error: "", message: "Roles fetched successfully." });

    } catch (error) {
        return res.status(500).json({ roles: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = RoleController;