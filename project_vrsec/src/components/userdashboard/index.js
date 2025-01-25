import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import {
  FaWalking,
  FaBed,
  FaHeartbeat,
  FaCalendarAlt,
  FaBullseye,
  FaUtensils,
  FaDumbbell,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CalendarSection from "../calender";
import Suggestion from "../personalizedplan";
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Mock data for steps, sleep, heart rate, and blood oxygen
const stepsData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Steps",
      data: [4000, 3000, 5000, 7000, 6000, 8000, 9000],
      borderColor: "#6a11cb",
      backgroundColor: "rgba(106, 17, 203, 0.2)",
    },
  ],
};

const sleepData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Sleep (hours)",
      data: [7, 6.5, 8, 7.5, 6, 9, 8.5],
      borderColor: "#ff7e5f",
      backgroundColor: "rgba(255, 126, 95, 0.2)",
    },
  ],
};

const heartRateData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Heart Rate (bpm)",
      data: [72, 75, 70, 68, 74, 76, 71],
      borderColor: "#ff416c",
      backgroundColor: "rgba(255, 65, 108, 0.2)",
    },
  ],
};

const bloodOxygenData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Blood Oxygen (%)",
      data: [98, 97, 99, 96, 98, 97, 99],
      borderColor: "#00c6ff",
      backgroundColor: "rgba(0, 198, 255, 0.2)",
    },
  ],
};

function UserDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("day");

 
  

  return (
    <div>
        <CalendarSection/>
        <Suggestion/>
    </div>
  );
}

export default UserDashboard;