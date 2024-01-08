const User = require("@/models/account/users.model");
const jwt = require("jsonwebtoken");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

const Middleware = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    try {
        if (!token) {
            return res.json({ success: false, error: "UNAUTHORIZED" });
        }
        const cachedValue = myCache.get("userData");
        if (myCache.has("userData") && cachedValue.token == token) {
            req.user = cachedValue;
            next();
        } else {
            const decoded = await jwt.verify(token, process.env.TOKEN_KEY);
            const user = await User.findOne({ _id: decoded._id });
            if (!user) {
                return res.json({ success: false, error: "USERNOTFOUND" });
            }
            user.token = token;
            req.user = user;
            myCache.set("userData", req.user, 7200); // Cache for 2 hour (7200 seconds)
            next();
        }
    } catch (error) {
        return res.json({ success: false, error: `Error: ${error}` });
    }
}

module.exports = Middleware;