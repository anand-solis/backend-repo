const User = require("@/models/account/users.model");

const updateProfileController = async (req, res) => {
    const { name, role } = req.body;

    try {
        await User.findOneAndUpdate(
            { _id: req.user._id },
            {
                name: name,
                role: role
            }
        );

        return res.status(200).json({ success: true, error: "", message: "User profile updated successfully." });

    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = updateProfileController;