const Feature = require("@/models/app/features.model");
const Permission = require("@/models/organization/permissions.model");

const createPermissionController = async (req, res) => {
    const { name } = req.body;
    const { organization } = req.query;
    try {
        const features = await Feature.find({}).select("_id");

        if (features.length > 0) {
            let NewPermissionRules = {
                organization: organization,
                name: name,
                createdBy: req?.user?.id,
                features: []
            };

            features.map((feature) => {
                NewPermissionRules.features.push({
                    feature: feature._id,
                    permissions: {
                        read: false,
                        update: false,
                        delete: false,
                        insert: false,
                    }
                })
            })

            const NewPermission = new Permission(NewPermissionRules);
            await NewPermission.save();

            return res.json({ success: true, error: "", message: "New permission created successfully." });
        }
        else {
            return res.json({ success: false, error: "You don't have any features yet.", message: "" });
        }
    } catch (error) {
        return res.json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = createPermissionController;