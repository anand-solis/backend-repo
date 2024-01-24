const DefaultPermission = require("@/models/app/defaultPermission.model");

const getAllDefaultPermissionController = async (req, res) => {
    try{
        const defaultPermission = await DefaultPermission
        .find({})
        .sort({ name: 1 })
        .select("-features");

        return res.json({ defaultPermissions: defaultPermission, success: true, error: "", message: "All default permissions fetched successfully" });
    } catch(error) {
        return res.json({ defaultPermissions: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getAllDefaultPermissionController;