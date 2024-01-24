const Feature = require("@/models/app/features.model");
const Permission = require("@/models/organization/permission.model");
const DefaultPermission = require("@/models/app/defaultPermission.model");

const RemoveFeatureController = async (req, res) => {
    const { feature } = req.body;

    try {
        await Feature.deleteOne({ _id: feature });
        const permissions = await Permission.find({});
        const defaultPermissions = await DefaultPermission.find({});

        defaultPermissions && defaultPermissions.map(async (defaultPermission) => {
            const updatedFeature = defaultPermission.features;
            const index = defaultPermission.features?.findIndex(item => item.feature == feature);

            if (index != -1) {
                updatedFeature.splice(index, 1);
            }
            await DefaultPermission.findOneAndUpdate({ _id: defaultPermission._id }, { features: updatedFeature })
        })

        permissions && permissions.map(async (permission) => {
            const updatedFeature = permission.features;
            const index = permission.features?.findIndex(item => item.feature == feature);

            if (index != -1) {
                updatedFeature.splice(index, 1);
            }
            await Permission.findOneAndUpdate({ _id: permission._id }, { features: updatedFeature })
        })

        return res.json({ success: true, error: "", message: "Feature removed successfully." });

    } catch (error) {
        return res.json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = RemoveFeatureController;