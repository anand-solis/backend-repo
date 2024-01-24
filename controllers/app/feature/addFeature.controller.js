const Feature = require("@/models/app/features.model");
const Permission = require("@/models/organization/permission.model");

const AddFeatureController = async (req, res) => {
    const { name, key, description } = req.body;

    try {
        const feature = new Feature({
            name: name,
            key: key,
            description: description
        });
    
        const newFeature = await feature.save();

        if(newFeature?._id){
            const featureId = newFeature?._id;
            const permissions = await Permission.find({});

            permissions && permissions.map(async (permission) => {
                const updatedFeature = permission.features;
                const index = permission.features?.findIndex(item => item?.feature == featureId);

                if(index == -1){
                    let permissions = {
                        read: false,
                        update: false,
                        delete: false,
                        insert: false
                    }
                    if(permission.isAdmin){
                        permissions = {
                            read: true,
                            update: true,
                            delete: true,
                            insert: true
                        }
                    }
                    updatedFeature.push({
                        feature: featureId,
                        permissions
                    })
                }

                await Permission.findOneAndUpdate({ _id: permission._id}, {features: updatedFeature})
            })

            return res.json({ success: true, error: "", message: "New Feature added successfully." });
        }
        else{
            return res.json({ success: false, error: `Error: Feature not added.`, message: "" });
        }
    } catch (error) {
        return res.json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = AddFeatureController;