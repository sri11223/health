const mongoose = require("mongoose");

const uri = "mongodb+srv://siddeswar0605:siddeswar@cluster0.0lw2o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed");
  }
};

module.exports = connectDb;
