const moment = require("moment");

const AppointmentModel = require("../models/appointmentModel");

const CategoryModel = require("../models/CategoryModel");

// Get total count of appointments with status breakdown
exports.getAppointmentsSummary = async (req, res) => {
  try {
    const appointmentSummary = await AppointmentModel.aggregate([
      {
        $group: {
          _id: "$status",
          totalAppointments: { $sum: 1 },
        },
      },
    ]);

    // Calculate total appointments and format the data for each status
    const totalAppointments = appointmentSummary.reduce(
      (acc, item) => acc + item.totalAppointments,
      0
    );
    const statusCounts = {
      Pending: 0,
      Completed: 0,
      Cancelled: 0,
      Process: 0,
      // Add any other statuses here as needed
    };

    // Populate status counts with dynamic data
    appointmentSummary.forEach((item) => {
      statusCounts[item._id] = item.totalAppointments;
    });

    res.status(200).json({
      status: "success",
      data: {
        totalAppointments,
        ...statusCounts,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

// Get total count of appointments
exports.getAppointmentsCount = async (req, res) => {
  // Get the start of the current month in ISO format
  const startOfMonth = new Date(
    moment().startOf("month").toISOString()
  );
  // Get the end of the current month in ISO format
  const endOfMonth = new Date(moment().endOf("month").toISOString());
  try {
    const appointmentsCount = await AppointmentModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: "$status",
          totalAppointments: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: {
        appointmentsCount,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.getMostAppointmentUser = async (req, res) => {
  // Get the start of the current month in ISO format
  const startOfMonth = new Date(
    moment().startOf("month").toISOString()
  );
  // Get the end of the current month in ISO format
  const endOfMonth = new Date(moment().endOf("month").toISOString());
  try {
    const appointmentsCount = await AppointmentModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: "$userId",
          totalAppointments: { $sum: 1 },
        },
      },
      {
        $sort: { totalAppointments: -1 },
      },
      {
        $limit: 10, // Get the first 10 document only
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          // _id: "$userDetails.phone",
          // name: "$userDetails.name",
          _id: 0, // Hides the MongoDB `_id` field
          userId: "$userDetails._id", // Returns the user ID
          name: "$userDetails.fullName", // Returns the user's name
          // phone: "$userDetails.phone", // Returns the user's phone number
          phone: { $toString: "$userDetails.phone" }, // Explicitly convert phone to string
          // email: "$userDetails.email", // Returns the user's email
          totalAppointments: 1, // Returns the total number of appointments
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: {
        appointmentsCount,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

// user dashboard stats
exports.getUserDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming `authMiddleware` adds `req.user`

    const appointmentCounts = await AppointmentModel.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Format the data to have counts for each status
    const statusCounts = {
      Pending: 0,
      Approved: 0,
      Cancelled: 0,
      "In-Progress": 0,
    };
    appointmentCounts.forEach((item) => {
      statusCounts[item._id] = item.count;
    });

    res.status(200).json({
      status: "success",
      data: {
        totalAppointments: appointmentCounts.reduce(
          (acc, item) => acc + item.count,
          0
        ),
        ...statusCounts,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.getCategorySummary = async (req, res) => {
  try {
    const categorySummary = await CategoryModel.aggregate([
      {
        $lookup: {
          from: 'appointments',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'appointments',
        },
      },
      {
        $project: {
          name: 1,
          count: { $size: '$appointments' },
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: categorySummary,
    });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};