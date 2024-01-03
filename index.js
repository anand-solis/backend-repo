const express = require("express");
const app = express();

const login = require("./routes/login/login.route");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const port = 5000;

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(login);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});