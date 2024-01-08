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
    "routes/login/login.route.js",
    "routes/otp/otp.route.js",
    "routes/email/email.route.js"
];

swaggerAutogen(outputFile, routes, docs);