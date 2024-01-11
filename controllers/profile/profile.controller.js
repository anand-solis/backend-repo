const User = require("@/models/account/users.model");

const ProfileController = async (req, res) => {
    const { name, email, phone, role } = req.body;
    try {
        const user = await User.findOneAndUpdate(
            { _id: req?.user?._id },
            {
                name: name,
                email: {
                    address: email.address
                },
                phone: {
                    number: phone.number
                },
                role: role
            }
        );
        return res.json({ success: true, error: "" });
    } catch (error) {
        return res.json({ success: false, error: `Error: ${error}` });
    }
}

module.exports = ProfileController;