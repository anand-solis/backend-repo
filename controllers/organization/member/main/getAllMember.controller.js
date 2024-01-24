const Member = require("@/models/organization/member.model");

const getAllMemberController = async (req, res) => {
    const { organization } = req.query;

    try {
        const members = await Member
            .find({ organization: organization })
            .select("user inviteAccepted permission isCreator")
            .populate({
                path: "user",
                select: ["name", "phone.number", "email.address"]
            })
            .populate({
                path: "permission",
                select: "name"
            })

        return res.json({ members: members, success: true, error: "", message: "Members fetched successfully." })
    } catch (error) {
        return res.json({ members: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getAllMemberController;