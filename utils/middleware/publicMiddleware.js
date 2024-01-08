const PublicMiddleware = async (req, res, next) => {
    next();
}

module.exports = PublicMiddleware;