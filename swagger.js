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
    "routes/app/login.route.js",
    "routes/app/otp.route.js",
    "routes/app/role.route.js",
    "routes/app/profile.route.js",
    "routes/app/email.route.js",
    "routes/app/sms.route.js",
    "routes/organization/organization.route.js"
];

swaggerAutogen(outputFile, routes, docs);