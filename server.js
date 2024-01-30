require("module-alias/register");
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

// Json Body
app.use(express.json({ urlencoded: true }));

// Documentation Imports
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("@/docs/swagger.json");

// Utils Imports
const connectDB = require("@/utils/connections/database/connectDB");

// Server Configuration
const PORT = process.env.PORT;

// Swagger Config Route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Cross-Origin Resource Sharing Policy
app.use(cors({ origin: "*" }));

// API Routes
app.use(require("@/routes/account/otp.route"));
app.use(require("@/routes/account/login.route"));
app.use(require("@/routes/account/logout.route"));
app.use(require("@/routes/account/role.route"));
app.use(require("@/routes/account/profile.route"));

app.use(require("@/routes/app/feature.route"));
app.use(require("@/routes/app/defaultPermission.route"));

app.use(require("@/routes/organization/organization.route"));
app.use(require("@/routes/organization/permission.route"));
app.use(require("@/routes/organization/site.route"));
app.use(require("@/routes/organization/member.route"));
app.use(require("@/routes/organization/plan.route"));

async function startServer() {
    try {
        // Connect to the database
        await connectDB();

        // Database connected successfully, now start the server
        app.listen(PORT, () => {
            console.log("Server is running on port :", PORT)
        })
    } catch (error) {
        console.error("Failed to connect to the database:", error)
        process.exit(1)
    }
}

startServer();