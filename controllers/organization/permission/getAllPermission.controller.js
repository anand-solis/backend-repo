const Permission = require("@/models/organization/permissions.model");

const getAllPermissionController = async (req, res) => {
    try{
        const permission = await Permission
        .find({})
        .sort({ name: 1 })
        .select("-organization -features")
        .populate({
            path: "createdBy",
            select: "name"
        });

        return res.json({ permission: permission, success: true, error: "", message: "All permissions fetched successfully" });
    } catch(error) {
        return res.json({ permission: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getAllPermissionController;