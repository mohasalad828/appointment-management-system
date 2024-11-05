const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// const express = require("express");
const {
  getAppointmentsCount,
  getAppointmentsSummary,
  getMostAppointmentUser,
  getUserDashboardStats,
} = require("../controllers/dashboardController");

const router = express.Router();

// Public routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);

// Protected routesgetMostAppointmentUser
router.get("/", authMiddleware, userController.getAllUsers);

router.get(
  "/appointments-summary",
  authMiddleware,
  getAppointmentsSummary
);

router.get(
  "/appointments-count",
  authMiddleware,
  getAppointmentsCount
);

router.get(
  "/most-appointment-user",
  authMiddleware,
  getMostAppointmentUser
);

router.get("/user-stats", authMiddleware, getUserDashboardStats);

module.exports = router;
