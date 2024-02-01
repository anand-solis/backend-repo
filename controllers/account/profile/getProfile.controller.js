const User = require("@/models/account/users.model");

const getProfileController = async (req, res) => {
    try {
        const user = await User
            .findOne({ _id: req.user._id })
            .select("name email phone role isSuperAdmin")
            .populate({
                path: "role",
                select: "name"
            });

        return res.status(200).json({ user: user, status: true, error: "", message: "User details fetched successfully." });
    } catch (error) {
        return res.status(500).json({ user: null, status: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = getProfileController;