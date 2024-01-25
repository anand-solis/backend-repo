const Member = require("@/models/organization/member.model");

const getPermissionByUserController = async (req, res) => {
    const { organization } = req.query;

    try{
        const permission = await Member
        .findOne({ user: req.user._id, organization: organization }, {"permissions": 1, "_id": 0})
        
        .populate({
            path: "permission",
            select: ["name", "isAdmin", "features"],
            populate: {
                path: "features.feature",
                select: ["name", "key"]
            }
        })

        return res.status(200).json({ permission: permission.permission, success: true, error: "", message: "User permission fetched successfully." });
    } catch(error) {
        return res.status(500).json({ permission: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getPermissionByUserController;