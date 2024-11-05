const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"],
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
