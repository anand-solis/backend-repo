const Role = require("@/models/account/roles.model");
const queryMiddleware = require("@/utils/middleware/api/queryMiddleware");

const RoleController = async (req, res) => {
    const roles = await queryMiddleware(req, Role);
    return res.json({ roles: roles.data, success: roles.success, error: roles.error, message: roles.message });
}

module.exports = RoleController;