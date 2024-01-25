const User = require("@/models/account/users.model");

const ProfileController = async (req, res) => {
    const { name, email, phone, role } = req.body;
    try {
        let data = {};
        if(req?.user?.email?.address && req?.user?.phone?.number){
            data = {
                name: name,
                role: role,
                phone: {
                    number: req?.user?.phone?.number,
                    isValid: req?.user?.phone?.isValid
                },
                email: {
                    address: req?.user?.email?.address,
                    isValid: req?.user?.email?.isValid
                }
            }
        }
        else if (req?.user?.email?.address) {
            data = {
                name: name,
                phone: {
                    number: phone,
                    isValid: false
                },
                email: {
                    address: req?.user?.email?.address,
                    isValid: req?.user?.email?.isValid
                },
                role: role
            }
        }
        else if(req?.user?.phone?.number){
            data = {
                name: name,
                email: {
                    address: email,
                    isValid: false
                },
                phone: {
                    number: req?.user?.phone?.number,
                    isValid: req?.user?.phone?.isValid
                },
                role: role
            }
        }
        else{
            data = {
                name: name,
                role: role
            }
        }

        await User.findOneAndUpdate({ _id: req?.user?._id }, data);
        return res.status(200).json({ success: true, error: "", message: "Profile updated successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}`, message: "" });
    }
}

module.exports = ProfileController;