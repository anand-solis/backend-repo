const User = require("@/models/account/users.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const NodeCache = require("node-cache");
const myCache = new NodeCache();
require("dotenv").config();
const connectSqlDB = require("@/utils/connections/database/connectSqlDB");

const Middleware = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    try {
        if (!token) {
            return res.status(401).json({ success: false, error: "Unauthorized user." });
        }
        else {
            const connectionSqlDB = connectSqlDB();

            connectionSqlDB.serialize(() => {
                connectionSqlDB.get(`SELECT token FROM tokens WHERE token = ?`, [token], async (error, row) => {
                    if (error) {
                        return res.status(500).json({ success: false, error: `Error: ${error}` });
                    }
                    else if (row?.token) {
                        return res.status(400).json({ success: false, error: "This token is expired." });
                    }
                    else{
                        const cachedValue = myCache.get("userData");
                        if (myCache.has("userData") && cachedValue.token == token) {
                            req.user = cachedValue;
                            next();
                        } else {
                            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            
                            const _id = new mongoose.Types.ObjectId(decoded?._doc?._id);
            
                            const user = await User.findOne({ _id: _id });
                            if (!user) {
                                return res.status(401).json({ success: false, error: "User account not found." });
                            }
                            if (user.blocked) {
                                return res.status(401).json({ success: false, error: "User account blocked." });
                            }
                            user.token = token;
                            req.user = user;
                            myCache.set("userData", req.user, 7200); // Cache for 2 hour (7200 seconds)
                            next();
                        }
                    }
                });
            });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: `Error: ${error}` });
    }
}

module.exports = Middleware;