import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaWeight, FaRulerVertical, FaHeartbeat, FaSave } from "react-icons/fa";
import "./index.css"; // Custom CSS for animations

const EditProfile = () => {
  const [healthData, setHealthData] = useState({
    age: "",
    gender: "",
    activityLevel: "",
    height: "",
    weight: { value: "", unit: "kg" },
    medicalConditions: [],
    selectedGoals: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");

  // Fetch user data on component mount
  useEffect(() => {
    const userIdFromCookie = Cookies.get("userID");
    if (userIdFromCookie) {
      setUserId(userIdFromCookie);
      fetchHealthData(userIdFromCookie);
    }
  }, []);

  // Fetch health data from the backend
  const fetchHealthData = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.post("https://health-1-71qg.onrender.com/api/auth/health-getdata", { userId });
      const userHealth = response.data.userHealth;
      setHealthData({
        age: userHealth.age || "",
        gender: userHealth.gender || "",
        activityLevel: userHealth.activityLevel || "",
        height: userHealth.height || "",
        weight: userHealth.weight || { value: "", unit: "kg" },
        medicalConditions: userHealth.medicalConditions || [],
        selectedGoals: userHealth.selectedGoals || [],
      });
    } catch (error) {
      console.error("Error fetching health data:", error);
      toast.error("Failed to fetch health data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHealthData({ ...healthData, [name]: value });
  };

  // Handle weight input changes
  const handleWeightChange = (e) => {
    const { name, value } = e.target;
    setHealthData({
      ...healthData,
      weight: { ...healthData.weight, [name]: value },
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/health-data/${userId}`,
        healthData
      );
      toast.success("Health data updated successfully!");
    } catch (error) {
      console.error("Error updating health data:", error);
      toast.error("Failed to update health data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="card shadow-lg animate_animated animate_fadeIn">
        <div className="card-header bg-primary text-white">
          <h1 className="card-title">
            <FaUser className="me-2" />
            Edit Profile
          </h1>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Age */}
            <div className="mb-3">
              <label className="form-label">
                <FaUser className="me-2" />
                Age
              </label>
              <input
                type="number"
                name="age"
                value={healthData.age}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            {/* Gender */}
            <div className="mb-3">
              <label className="form-label">
                <FaUser className="me-2" />
                Gender
              </label>
              <select
                name="gender"
                value={healthData.gender}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Activity Level */}
            <div className="mb-3">
              <label className="form-label">
                <FaHeartbeat className="me-2" />
                Activity Level
              </label>
              <select
                name="activityLevel"
                value={healthData.activityLevel}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select Activity Level</option>
                <option value="Sedentary">Sedentary</option>
                <option value="Lightly Active">Lightly Active</option>
                <option value="Moderately Active">Moderately Active</option>
                <option value="Very Active">Very Active</option>
                <option value="Extremely Active">Extremely Active</option>
              </select>
            </div>

            {/* Height */}
            <div className="mb-3">
              <label className="form-label">
                <FaRulerVertical className="me-2" />
                Height (cm)
              </label>
              <input
                type="number"
                name="height"
                value={healthData.height}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            {/* Weight */}
            <div className="mb-3">
              <label className="form-label">
                <FaWeight className="me-2" />
                Weight ({healthData.weight.unit})
              </label>
              <input
                type="number"
                name="value"
                value={healthData.weight.value}
                onChange={handleWeightChange}
                className="form-control"
                required
              />
              <select
                name="unit"
                value={healthData.weight.unit}
                onChange={handleWeightChange}
                className="form-select mt-2"
                required
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              <FaSave className="me-2" />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
