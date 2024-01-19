const getPermissionController = async (req, res) => {
    const { organization } = req.body;
    const { id } = req.params;
    try{
        const permission = await Permission
        .findOne({ _id: id, organization: organization })
        .sort({ name: 1 })
        .select("name isAdmin features")
        .populate({
            path: "features.feature",
            select: ["name", "key"]
        })
        .populate({
            path: "createdBy",
            select: "name"
        });

        return res.json({ permission: permission, success: true, error: "", message: "permission details fetched successfully" });
    } catch(error) {
        return res.json({ permission: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getPermissionController;

const Permission = require("@/models/organization/permissions.model");