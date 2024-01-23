const Permission = require("@/models/organization/permission.model");

const updatePermissionController = async (req, res) => {
    const { permissions } = req.body;

    try{
        const prevPermission = await Permission.findOne({ _id: permissions._id });

        if(!prevPermission?.isAdmin){
            let updatePermission = prevPermission;
            updatePermission.updatedAt = new Date();
            updatePermission.updatedBy = req.user._id;

            const featureKeys = Object.keys(permissions.features);

            featureKeys && featureKeys.map(key => {
                const index = updatePermission.features.findIndex(item => item._id == key);
    
                updatePermission.features[index].permissions.read = permissions.features[key].read;
                updatePermission.features[index].permissions.update = permissions.features[key].update;
                updatePermission.features[index].permissions.delete = permissions.features[key].delete;
                updatePermission.features[index].permissions.insert = permissions.features[key].insert;
    
                if(permissions.features[key].update || permissions.features[key].delete || permissions.features[key].insert){
                    updatePermission.features[index].permissions.read = true;
                }
            });
    
            await Permission.findOneAndUpdate({ _id: permissions._id }, updatePermission);
    
            res.json({ success: true, error: "", message: "Permission updated successfully." });
        }
        else{
            return res.json({ success: false, error: "Admin Permissions can't change.", message: "" });
        }
    } catch (error){
        return res.json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = updatePermissionController;