const swaggerAutogen = require("swagger-autogen")();

const docs = {
    info: {
        title: "API Documentation",
        description: "Solis Construction Backend Documentation"
    },
    host: "localhost:5000"
};

const outputFile = "./swagger.json";

const routes = [
    "index.js",
    "./routes/login/login.js"
];

swaggerAutogen(outputFile, routes, docs);