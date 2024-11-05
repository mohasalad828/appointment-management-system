const UserModel = require("../models/UserModel");
const userValidation = require("../validations/userValidation");
const loginValidation = require("../validations/loginValidation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};
// Get a single user by ID
const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .send({ status: false, message: "User not found" });
    }
    res.status(200).send({ status: true, data: user });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};
// Create a new user (signup)
const signup = async (req, res) => {
  try {
    // Validate input
    const { error } = userValidation(req.body);
    if (error)
      return res
        .status(400)
        .send({ status: false, message: error.message });
    // Check if the email already exists
    const existingUser = await UserModel.findOne({
      email: req.body.email,
    });
    if (existingUser)
      return res.status(400).send({ message: "User already exists" });
    // Hash the password
    const salt = await bcrypt.genSalt(10); // Adjust the number for desired hashing strength
    const hashed_password = await bcrypt.hash(
      req.body.password,
      salt
    );

    // Create the user with the hashed password
    const user = new UserModel({
      ...req.body,
      password: hashed_password,
    });

    await user.save();

    res.status(201).send({
      status: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

// User login
// const login = async (req, res) => {
//   console.log("Logged in");
//   try {
//     const { error } = loginValidation(req.body);
//     if (error)
//       return res
//         .status(400)
//         .send({ status: false, message: error.message });

//     const user = await UserModel.findOne({ email: req.body.email });

//     console.log("User logged in", user);
//     if (
//       !user ||
//       !(await bcrypt.compare(req.body.password, user.password))
//     ) {
//       return res.status(400).send({
//         status: false,
//         message: "Invalid email or password",
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email, role: user.role },
//       "AppointmentSecretKey",
//       { expiresIn: "1h" }
//     );

//     res
//       .status(200)
//       .send({ status: true, message: "Login successful", token });
//   } catch (error) {
//     res.status(500).send({ status: false, message: error.message });
//   }
// };
// User login
const login = async (req, res) => {
  console.log("Logged in");
  try {
    const { error } = loginValidation(req.body);
    if (error)
      return res
        .status(400)
        .send({ status: false, message: error.message });

    const user = await UserModel.findOne({ email: req.body.email });

    console.log("User logged in", user);
    if (
      !user ||
      !(await bcrypt.compare(req.body.password, user.password))
    ) {
      return res.status(400).send({
        status: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      "AppointmentSecretKey",
      { expiresIn: "1h" }
    );

    res.status(200).send({
      status: true,
      message: "Login successful",
      token,
      role: user.role, // Include role in the response
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

// Update a user by ID
// const updateUser = async (req, res) => {
//   try {
//     const { error } = userValidation(req.body);
//     if (error)
//       return res
//         .status(400)
//         .send({ status: false, message: error.message });

//     const user = await UserModel.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
//     if (!user) {
//       return res
//         .status(404)
//         .send({ status: false, message: "User not found" });
//     }

//     res.status(200).send({
//       status: true,
//       message: "User updated successfully",
//       data: user,
//     });
//   } catch (error) {
//     res.status(500).send({ status: false, message: error.message });
//   }
// };

const updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.body.password) {
      // Hash the new password if provided
      updateData.password = await bcrypt.hash(req.body.password, 10);
    } else {
      delete updateData.password;
    }

    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    res.status(200).json({ status: "success", data: { user } });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .send({ status: false, message: "User not found" });
    }
    res
      .status(200)
      .send({ status: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  signup,
  login,
  updateUser,
  deleteUser,
};
