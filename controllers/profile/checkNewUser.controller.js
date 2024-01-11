const User = require("@/models/account/users.model");

const CheckNewUserController = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req?.user?._id });

        if(user?._id){
            if(user?.name && user?.role){
                return res.json({ exist: true, isNew: false, success: true, error: "" });
            }
            else{
                return res.json({ exist: true, isNew: true, success: true, error: "" });
            }
        }
        else{
            return res.json({ exist: false, isNew: null, success: true, error: "" });
        }
    } catch (error) {
        return res.json({ exist: null, isNew: null, success: false, error: `Error: ${error}` });
    }
}

module.exports = CheckNewUserController;