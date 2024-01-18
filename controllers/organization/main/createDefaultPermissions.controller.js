const DefaultPermissions = require("@/helpers/defaultPermissions");
const Feature = require("@/models/app/features.model");
const Permission = require("@/models/organization/permissions.model");
const Member = require("@/models/organization/members.model");

const createDefaultPermissions = async (organizationId, userId) => {
    try {
        const features = await Feature.find({}).select("_id");

        if (features.length > 0) {
            const HardPermissions = DefaultPermissions();

            HardPermissions.forEach(async (permission) => {
                let NewPermissionRules = {
                    organization: organizationId,
                    name: permission.name,
                    createdBy: userId,
                    features: []
                };

                features.map((feature) => {
                    const index = permission.permissions?.findIndex(item => item.id === feature._id);

                    const hardPermission = permission.permissions[index];
                    let rule = {};

                    if(hardPermission){
                        rule = {
                            read: hardPermission.read,
                            update: hardPermission.update,
                            delete: hardPermission.delete,
                            insert: hardPermission.insert,
                        }
                    }
                    else{
                        rule = {
                            read: true,
                            update: true,
                            delete: true,
                            insert: true,
                        }
                    }

                    NewPermissionRules.features.push({
                        feature: feature._id,
                        permissions: rule
                    })
                })

                const NewPermission = new Permission(NewPermissionRules);
                await NewPermission.save();
            })

            const AdminPermission = await Permission.findOne({ organization: organizationId, name: "Admin" }).select("_id");

            if(AdminPermission?._id){
                const NewMember = new Member({
                    organization: organizationId,
                    user: userId,
                    permission: AdminPermission._id,
                    isCreator: true
                })
    
                await NewMember.save();
            }
            else{
                return { success: false, error: "Admin permission not found.", message: "" };
            }

            return { success: true, error: "", message: "Permissions and Member created successfully." };
        }
        else {
            return { success: false, error: "You don't have any features yet.", message: "" };
        }
    } catch (error) {
        return { success: false, error: `Error: ${error}`, message: "" };
    }
}

module.exports = createDefaultPermissions;