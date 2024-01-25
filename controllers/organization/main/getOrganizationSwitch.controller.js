const Member = require("@/models/organization/member.model");
const Organization = require("@/models/organization/organization.model");

const getOrganizationSwitchController = async (req, res) => {
    try {
        const members = await Member.find({ user: req?.user?._id }).select("organization");
        if(members.length == 0){
            return res.status(204).json({ organizations: null, success: false, error: "You are not any organization.", message: "" });
        }
        else{
            const haveOrganizationIds = members.map(member => member.organization);

            const organizations = await Organization.find({ _id: { $in: haveOrganizationIds } }).select("name").sort({ createdAt: -1 });
    
            return res.status(200).json({ organizations: organizations, success: true, error: "", message: "Organizations fetched successfully." });
        }
    } catch (error) {
        return res.status(500).json({ organizations: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getOrganizationSwitchController;