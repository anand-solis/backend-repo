const DefaultPermission = require("@/models/app/defaultPermission.model");

const getDefaultPermissionController = async (req, res) => {
    const { id } = req.params;
    try{
        const defaultPermission = await DefaultPermission
        .findOne({ _id: id })
        .sort({ name: 1 })
        .select("name isAdmin features")
        .populate({
            path: "features.feature",
            select: ["name", "key"]
        });

        return res.json({ defaultPermission: defaultPermission, success: true, error: "", message: "Default Permission fetched successfully." });
    } catch(error) {
        return res.json({ defaultPermission: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getDefaultPermissionController;