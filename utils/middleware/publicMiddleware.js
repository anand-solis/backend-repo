// const PublicMiddleware = (req, res, next) => {
//     const apiToken = process.env.PUBLIC_API_TOKEN;
//     const { token } = req.body;

//     if (apiToken == token) {
//         next();
//     }
//     else{
//         return res.status(403).send("You don't have permission to do this task!");
//     }
// };

const PublicMiddleware = (req, res, next) => {
    next();
};

module.exports = PublicMiddleware;