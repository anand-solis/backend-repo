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
    "routes/account/login.route.js",
    "routes/account/otp.route.js",
    "routes/account/role.route.js",
    "routes/account/profile.route.js",
    "routes/app/email.route.js",
    "routes/app/sms.route.js",
    "routes/organization/organization.route.js",
    "routes/organization/permission.route",
    "routes/organization/site.route",
    "routes/organization/invite.route"
];

swaggerAutogen(outputFile, routes, docs);