const Role = require("@/models/account/roles.model");

const RoleController = async (req, res) => {
    try {
        const roles = await Role.find({});
        return res.json({ roles: roles, success: true, error: "" });
    } catch (error) {
        return res.json({ roles: [], success: false, error: `Error: ${error}` });
    }
}

module.exports = RoleController;