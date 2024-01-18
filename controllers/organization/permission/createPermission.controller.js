const Feature = require("@/models/app/features.model");
const Permission = require("@/models/organization/permissions.model");

const createPermissionController = async (req, res) => {
    const { name, organization } = req.body;
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
                NewPermission.features.push({
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

            res.json({ success: true, error: "", message: "New permission created successfully." });
        }
        else {
            res.json({ success: false, error: "You don't have any features yet.", message: "" });
        }
    } catch (error) {
        res.json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = createPermissionController;