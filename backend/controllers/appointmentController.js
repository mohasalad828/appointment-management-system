const Appointment = require("../models/appointmentModel");
const appointmentValidation = require("../validations/appointmentValidation");

// Get all appointments
// exports.getAllAppointments = async (req, res) => {
//   try {
//     const appointments = await Appointment.find()
//       .populate("userId", "name email") // Populate user data
//       .populate("categoryId", "name"); // Populate category data

//     res.status(200).json({
//       status: "success",
//       results: appointments.length,
//       data: { appointments },
//     });
//   } catch (error) {
//     res.status(500).json({ status: "fail", message: error.message });
//   }
// };

// exports.getAllAppointments = async (req, res) => {
//   try {
//     const appointments = await Appointment.find({
//       userId: req.user.id,
//     })
//       .populate("userId", "name email")
//       .populate("categoryId", "name");

//     res.status(200).json({
//       status: "success",
//       results: appointments.length,
//       data: { appointments },
//     });
//   } catch (error) {
//     res.status(500).json({ status: "fail", message: error.message });
//   }
// };

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("userId", "name email") // Include only `name` and `email` for `userId`
      .populate("categoryId", "name") // Include only `name` for `categoryId`
      .select("-__v"); // Exclude `__v` from results

    res.status(200).json({
      status: "success",
      results: appointments.length,
      data: { appointments },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

// Get an appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("userId", "name email")
      .populate("categoryId", "name");

    if (!appointment) {
      return res
        .status(404)
        .json({ status: "fail", message: "Appointment not found" });
    }

    res
      .status(200)
      .json({ status: "success", data: { appointment } });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

// Create an appointment
// exports.createAppointment = async (req, res) => {
//   try {
//     const { error } = appointmentValidation(req.body);
//     if (error) {
//       return res
//         .status(400)
//         .json({ status: "fail", message: error.message });
//     }

//     const newAppointment = await Appointment.create({
//       // userId: req.user.id,
//       userId: req.user.id, // Set userId from authenticated user
//       categoryId: req.body.categoryId,
//       title: req.body.title,
//       location: req.body.location,
//       date: req.body.date,
//       time: req.body.time,
//       status: req.body.status || "Pending",
//     });

//     res.status(201).json({
//       status: "success",
//       data: { appointment: newAppointment },
//     });
//   } catch (error) {
//     res.status(500).json({ status: "fail", message: error.message });
//   }
// };

exports.createAppointment = async (req, res) => {
  try {
    const newAppointment = await Appointment.create({
      userId: req.user.id,
      categoryId: req.body.categoryId,
      title: req.body.title,
      duration: req.body.duration,
      availability: req.body.availability,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      status: req.body.status || "Pending",
    });

    res.status(201).json({
      status: "success",
      data: { appointment: newAppointment },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
  try {
    const { error } = appointmentValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: "fail", message: error.message });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate("userId", "name email")
      .populate("categoryId", "name");

    if (!appointment) {
      return res
        .status(404)
        .json({ status: "fail", message: "Appointment not found" });
    }

    res
      .status(200)
      .json({ status: "success", data: { appointment } });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(
      req.params.id
    );
    if (!appointment) {
      return res
        .status(404)
        .json({ status: "fail", message: "Appointment not found" });
    }
    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};
