const Permission = require("@/models/organization/permissions.model");

const getAllPermissionController = async (req, res) => {
    const { organization } = req.body;
    try{
        const permission = await Permission
        .find({ organization: organization })
        .sort({ name: 1 })
        .select("-organization -features")
        .populate({
            path: "createdBy",
            select: "name"
        });

        return res.json({ permissions: permission, success: true, error: "", message: "All permissions fetched successfully" });
    } catch(error) {
        return res.json({ permissions: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getAllPermissionController;