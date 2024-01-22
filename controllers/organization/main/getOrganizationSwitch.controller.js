const Member = require("@/models/organization/members.model");
const Organization = require("@/models/organization/organization.model");

const getOrganizationSwitchController = async (req, res) => {
    try {
        const members = await Member.find({ user: req?.user?._id }).select("organization");
        if(members.length == 0){
            return res.json({ organizations: null, success: false, error: "You are not any organization.", message: "" });
        }
        else{
            const haveOrganizationIds = members.map(member => member.organization);

            const organizations = await Organization.find({ _id: { $in: haveOrganizationIds } }).select("name").sort({ createdAt: -1 });
    
            return res.json({ organizations: organizations, success: true, error: "", message: "Organizations records fetched successfully." });
        }
    } catch (error) {
        return res.json({ organizations: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getOrganizationSwitchController;