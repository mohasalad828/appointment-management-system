const express = require("express");
const appointmentController = require("../controllers/appointmentController");
const authMiddleware = require("../middleware/authMiddleware"); // JWT middleware

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, appointmentController.getAllAppointments)
  .post(authMiddleware, appointmentController.createAppointment);

// Define the /reports route with a separate .get() for `getAppointmentReports`
router.get("/reports", appointmentController.getAppointmentReports);

router
  .route("/:id")
  .get(authMiddleware, appointmentController.getAppointmentById)
  .put(authMiddleware, appointmentController.updateAppointment)
  .delete(authMiddleware, appointmentController.deleteAppointment);

module.exports = router;
