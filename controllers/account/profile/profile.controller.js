const User = require("@/models/account/users.model");

const ProfileController = async (req, res) => {
    const { name, email, phone, role } = req.body;
    try {
        let data = {};
        
        if (req?.user?.email) {
            data = {
                name: name,
                phone: {
                    number: phone
                },
                role: role
            }
        }
        if(req?.user?.phone){
            data = {
                name: name,
                email: {
                    address: email
                },
                role: role
            }
        }
        if(req?.user?.email && req?.user?.phone){
            data = {
                name: name,
                role: role
            }
        }

        await User.findOneAndUpdate({ _id: req?.user?._id }, data);
        return res.json({ success: true, error: "" });
    } catch (error) {
        return res.json({ success: false, error: `Error: ${error}` });
    }
}

module.exports = ProfileController;