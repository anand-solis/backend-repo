const Feature = require("@/models/app/features.model");
const Permission = require("@/models/organization/permission.model");

const RemoveFeatureController = async (req, res) => {
    const { feature } = req.body;

    try {
        await Feature.deleteOne({ _id: feature });
        const permissions = await Permission.find({});

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