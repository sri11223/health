const mongoose = require("mongoose");

const userHealthSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User collection
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  age: {
    type: Number,
    required: true,
  },
  activityLevel: {
    type: String,
    required: true,
    enum: ["Lazy", "Active", "Hyperactive", "Average"],
  },
  height: {
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: ["cm", "inches", "feet"],
    },
  },
  weight: {
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: ["kg", "lbs"],
    },
  },
  medicalConditions: {
    type: [String],
    default: [],
  },
  otherCondition: {
    type: String,
    default: "",
  },
  selectedGoals: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("UserHealth", userHealthSchema);