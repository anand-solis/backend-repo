const User = require("@/models/account/users.model");
const jwt = require("jsonwebtoken");

const AssignJWTToken = async (user) => {
    const token = jwt.sign({ ...user }, process.env.JWT_SECRET, { expiresIn: "1d" });
    if (token) {
        await User.findOneAndUpdate({ _id: user._id }, { isLoggedIn: true, loggedInTime: new Date() });
        return { success: true, error: "", token: token }
    }
    else {
        return { success: false, error: "Token not assigned to user.", token: null };
    }
}

module.exports = AssignJWTToken;