const express = require("express");
const cors = require("cors");
const dashboardRouter = require("./routes/dashboardRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const userRouter = require("./routes/userRoutes");
const appointmentRouter = require("./routes/appointmentRoutes");

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors());

// Use routes
app.use("/api/dashboard", dashboardRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/users", userRouter);
app.use("/api/appointments", appointmentRouter);

module.exports = app;
