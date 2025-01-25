const User = require("../models/usermodel");
const UserHealth = require("../models/UserHealth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ username });
    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    const token = jwt.sign({ userId: user._id }, "your_secret_key", { expiresIn: "1h" });
    res.status(201).json({ msg: "User registered successfully", token, userId: user._id.toString() });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Login an existing user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const userExist = await User.findOne({ email });
    console.log(userExist)
    if (!userExist) {
      console.log("siffu")
      return res.status(401).json({ msg: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userExist.password);
    if (!isPasswordCorrect) {
      console.log("siff12u")
      return res.status(401).json({ msg: "Invalid password" });
    }

    const token = jwt.sign({ userId: userExist._id }, "your_secret_key", { expiresIn: "1h" });
    console.log(token)
    res.status(200).json({ msg: "Login successful", token, userId: userExist._id.toString() });
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message });
  }
};

// Save user health data
const saveHealthData = async (req, res) => {
  try {
    const {
      userId,
      gender,
      age,
      activityLevel,
      height,
      weight,
      medicalConditions,
      otherCondition,
      selectedGoals,
    } = req.body;
console.log(req.body.userId)
    // Create or update user health data
    const userHealth = await UserHealth.findOneAndUpdate(
      { userId },
      {
        gender,
        age,
        activityLevel,
        height,
        weight,
        medicalConditions,
        otherCondition,
        selectedGoals,
      },
      { new: true, upsert: true }
    );

    res.status(201).json({ msg: "User health data saved successfully", userHealth });
  } catch (error) {
    console.error("Error saving user health data:", error);
    res.status(500).json({ error: "Failed to save user health data" });
  }
};

// Get user health data
const getHealthData = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId)
    const userHealth = await UserHealth.findOne({ userId });

    if (!userHealth) {
      return res.status(404).json({ msg: "Health data not found" });
    }
console.log(userHealth)
    res.status(200).json({ userHealth });
  } catch (error) {
    console.error("Error fetching user health data:", error);
    res.status(500).json({ error: "Failed to fetch user health data" });
  }
};
const updateHealthData = async (req, res) => {
  try {
    const { userId } = req.body;
     // Use req.body instead of req.params
    const updatedData = req.body;
    console.log(updatedData)

    console.log("UserId:", userId);
    console.log("Updated Data:", updatedData);

    // Find and update the user's health data
    const userHealth = await UserHealth.findOneAndUpdate(
      { userId }, // Query to find the document
      updatedData, // Data to update
      { new: true, runValidators: true } // Options: return the updated document and run schema validators
    );

    console.log("Updated User Health Data:", userHealth);

    if (!userHealth) {
      return res.status(404).json({ msg: "User health data not found" });
    }
    console.log("Updated User Health Data:", userHealth);

    res.status(201).json({ msg: "User health data updated successfully", userHealth });
  } catch (error) {
    console.error("Error updating user health data:", error);
    res.status(500).json({ error: "Failed to update user health data" });
  }
};module.exports = { register, login, saveHealthData, getHealthData ,updateHealthData};