const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const adminRoutes = require("./routes/adminRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(errorHandler);


// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "API Running"
    });
});

module.exports = app;