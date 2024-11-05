const mongoose = require("mongoose");

function MongoDb() {
  mongoose
    .connect(
      // 'mongodb+srv://ajb1434:nkKbBiDV6ByVow4Y@cluster0.bmydzw6.mongodb.net/AppointmentSystem'
      "mongodb://localhost:27017/appointment-management"
    )
    .then(
      console.log("Database connection established successfully.")
    )
    .catch((err) => console.log(err));
}

module.exports = {
  MongoDb,
};
