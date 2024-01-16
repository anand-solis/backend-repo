const swaggerAutogen = require("swagger-autogen")();

const docs = {
    info: {
        title: "Solis Construction Backend API Documentation",
        description: "Solis Construction Backend API Documentation"
    },
    host: "localhost:5000"
};

const outputFile = "./docs/swagger.json";

const routes = [
    "routes/login.route.js",
    "routes/otp.route.js",
    "routes/role.route.js",
    "routes/profile.route.js",
    "routes/email.route.js",
    "routes/sms.route.js",
    "routes/organization.route.js"
];

swaggerAutogen(outputFile, routes, docs);