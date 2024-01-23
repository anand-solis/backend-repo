const superAdminMiddleware = async (req, res, next) => {
    try {
        if (req.user?.isSuperAdmin) {
            next();
        }
        else{
            return res.json({ success: false, error: "You don't have permissions to do this task." });
        }
    } catch (error) {
        return res.json({ success: false, error: `Error: ${error}` });
    }
}

module.exports = superAdminMiddleware;