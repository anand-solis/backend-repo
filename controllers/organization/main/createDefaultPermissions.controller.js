const DefaultPermission = require("@/models/app/defaultPermission.model");
const Feature = require("@/models/app/features.model");
const Permission = require("@/models/organization/permission.model");
const Member = require("@/models/organization/member.model");

const createDefaultPermissions = async (organizationId, userId) => {
    try {
        const features = await Feature.find({}).select("_id");
        var AdminPermissionId;

        if (features.length > 0) {
            const defaultPermissions = await DefaultPermission
            .find({})
            .select("name isAdmin features")
            .populate({
                path: "features.feature",
                select: "_id"
            });

            await Promise.all(defaultPermissions.map(async (permission) => {
                let NewPermissionRules = {
                    organization: organizationId,
                    name: permission.name,
                    isAdmin: permission.isAdmin,
                    createdBy: userId,
                    features: []
                };

                await Promise.all(permission.features.map(async (feature) => {
                    let rule = {
                        read: feature.permissions.read,
                        update: feature.permissions.update,
                        delete: feature.permissions.delete,
                        insert: feature.permissions.insert,
                    };

                    NewPermissionRules.features.push({
                        feature: feature.feature._id,
                        permissions: rule
                    });
                }));

                const NewPermission = new Permission(NewPermissionRules);
                if (permission.isAdmin) {
                    const PermissionId = await NewPermission.save();
                    AdminPermissionId = PermissionId?._id;
                } else {
                    await NewPermission.save();
                }
            }));

            if(AdminPermissionId){
                const NewMember = new Member({
                    organization: organizationId,
                    user: userId,
                    permission: AdminPermissionId,
                    isCreator: true,
                    inviteAccepted: true
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