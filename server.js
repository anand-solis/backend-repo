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
const connectDB = require("@/utils/connectDB");

// Server Configuration
const PORT = process.env.PORT;

// Swagger Config Route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Cross-Origin Resource Sharing Policy
app.use(cors({ origin: "*" }));

// API Routes
app.use(require("@/routes/otp.route"));
app.use(require("@/routes/login.route"));
app.use(require("@/routes/profile.route"));
app.use(require("@/routes/email.route"));
app.use(require("@/routes/sms.route"));

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