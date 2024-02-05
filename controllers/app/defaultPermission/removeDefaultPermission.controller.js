const DefaultPermission = require("@/models/app/defaultPermission.model");

const RemoveDefaultPermissionController = async (req, res) => {
    const { id } = req.params;

    try {
        await DefaultPermission.deleteOne({ _id: id });

        return res.status(200).json({ success: true, error: "", message: "Default Permission removed successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = RemoveDefaultPermissionController;