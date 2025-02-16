const Appointment = require("../models/appointmentModel");
const UserModel = require("../models/UserModel");
const notificationService = require("../services/notificationService");
const appointmentValidation = require("../validations/appointmentValidation");
const moment = require('moment');

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("userId", "name email")
      .populate("categoryId", "name")
      .select("-__v");

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

    res.status(200).json({ status: "success", data: { appointment } });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

// Create a new appointment with SMS notification
exports.createAppointment = async (req, res) => {
  try {
    // Validation
    const { error } = appointmentValidation(req.body);
    if (error) {
      return res.status(400).json({ status: "fail", message: error.message });
    }

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

    const user = await UserModel.findById(req.user.id);
    await notificationService.sendNewAppointmentNotification(user, newAppointment);

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
      return res.status(400).json({ status: "fail", message: error.message });
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

    res.status(200).json({ status: "success", data: { appointment } });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
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

// Get appointment reports
exports.getAppointmentReports = async (req, res) => {
  try {
    const { startDate, categoryId, status } = req.query;
    const filter = {};

    // Apply filters if provided
    if (startDate) {
      filter.startDate = { $gte: new Date(startDate) };
    }
    if (categoryId) {
      filter.categoryId = categoryId;
    }
    if (status) {
      filter.status = status;
    }

    const appointments = await Appointment.find(filter)
      .populate("userId", "fullName email")
      .populate("categoryId", "name");

    res.status(200).json({
      status: "success",
      results: appointments.length,
      data: { appointments },
    });
  } catch (error) {
    console.error("Error in getAppointmentReports:", error.message);
    res.status(500).json({ status: "fail", message: "Server error" });
  }
};
