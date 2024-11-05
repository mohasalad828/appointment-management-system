// const express = require("express");
// const appointmentController = require("../controllers/appointmentController");
// const auth = require("../middleware/authMiddleware");
// const router = express.Router();

// router.post("/", auth, appointmentController.createAppointment);
// router.get("/", appointmentController.getAllAppointments);

// router.get("/:id", appointmentController.getAppointmentById);
// router.put("/:id", appointmentController.updateAppointment);
// router.delete("/:id", appointmentController.deleteAppointment);

// module.exports = router;

// routes/appointmentRoutes.js

const express = require("express");
const appointmentController = require("../controllers/appointmentController");
const authMiddleware = require("../middleware/authMiddleware"); // JWT middleware

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, appointmentController.getAllAppointments)
  .post(authMiddleware, appointmentController.createAppointment);

router
  .route("/:id")
  .get(authMiddleware, appointmentController.getAppointmentById)
  .put(authMiddleware, appointmentController.updateAppointment)
  .delete(authMiddleware, appointmentController.deleteAppointment);

module.exports = router;
