const SiteMember = require("@/models/organization/site/siteMember.model");

const getAllAddedSiteMemberController = async (req, res) => {
    const { site } = req.query;

    try {
        const siteMember = await SiteMember
            .find({ site: site })
            .select("member inviteAccepted")
            .populate({
                path: "member",
                select: ["user", "permission", "inviteAccepted", "isCreator"],
                populate: [
                    {
                        path: "user",
                        select: ["name", "phone.number", "email.address"]
                    },
                    {
                        path: "permission",
                        select: "name"
                    }
                ]
            })

        return res.json({ siteMembers: siteMember, success: true, error: "", message: "Site members fetched successfully." });

    } catch (error) {
        return res.json({ siteMembers: null, success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getAllAddedSiteMemberController;