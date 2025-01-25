import React from "react";
import { FaBullseye, FaUsers, FaHandshake, FaLightbulb, FaRocket, FaTrophy, FaChartLine } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // Custom CSS for animations

const AboutUs = () => {
  // Data for pie charts
  const usersEngagedData = [
    { name: "Active Users", value: 75 },
    { name: "Inactive Users", value: 25 },
  ];

  const healthDataTrackedData = [
    { name: "Weight Tracked", value: 60 },
    { name: "Height Tracked", value: 40 },
  ];

  const goalsAchievedData = [
    { name: "Goals Achieved", value: 80 },
    { name: "Goals Pending", value: 20 },
  ];

  // Colors for pie charts
  const COLORS = ["#00C853", "#FFC107", "#FF5722", "#03A9F4"];

  return (
    <section id="about-us" className="about-us-section py-5">
      <div className="container">
        {/* Section Title */}
        <h2 className="text-center mb-5 fw-bold animate__animated animate__fadeInDown">About Us</h2>

        {/* Key Metrics */}
        <div className="row mb-5">
          <div className="col-md-4 mb-4">
            <div className="about-card p-4 text-center shadow-sm animate__animated animate__fadeInUp">
              <div className="icon-wrapper mb-3">
                <FaUsers className="about-icon text-primary" />
              </div>
              <h3 className="h4 mb-3">Users</h3>
              <p className="display-4 fw-bold text-primary">100,000+</p>
              <p className="text-muted">
                Registered users trusting our platform for their health needs.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="about-card p-4 text-center shadow-sm animate__animated animate__fadeInUp animate__delay-1s">
              <div className="icon-wrapper mb-3">
                <FaChartLine className="about-icon text-success" />
              </div>
              <h3 className="h4 mb-3">Data Points</h3>
              <p className="display-4 fw-bold text-success">1M+</p>
              <p className="text-muted">
                Health data points tracked, including weight, height, and activity levels.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="about-card p-4 text-center shadow-sm animate__animated animate__fadeInUp animate__delay-2s">
              <div className="icon-wrapper mb-3">
                <FaTrophy className="about-icon text-warning" />
              </div>
              <h3 className="h4 mb-3">Goals Achieved</h3>
              <p className="display-4 fw-bold text-warning">80%</p>
              <p className="text-muted">
                Of users have successfully achieved their health goals.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us? */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="about-card p-4 text-center shadow-sm animate__animated animate__fadeInUp">
              <div className="icon-wrapper mb-3">
                <FaHandshake className="about-icon text-warning" />
              </div>
              <h3 className="h4 mb-3">Trusted by Thousands</h3>
              <p className="text-muted">
                Join a community of thousands of users who trust us to help them achieve their health goals.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="about-card p-4 text-center shadow-sm animate__animated animate__fadeInUp animate__delay-1s">
              <div className="icon-wrapper mb-3">
                <FaLightbulb className="about-icon text-info" />
              </div>
              <h3 className="h4 mb-3">Innovative Solutions</h3>
              <p className="text-muted">
                We leverage cutting-edge technology to provide innovative and effective health solutions.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="about-card p-4 text-center shadow-sm animate__animated animate__fadeInUp animate__delay-2s">
              <div className="icon-wrapper mb-3">
                <FaRocket className="about-icon text-danger" />
              </div>
              <h3 className="h4 mb-3">Fast and Reliable</h3>
              <p className="text-muted">
                Our platform is designed to be fast, reliable, and easy to use, ensuring a smooth experience for all users.
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="row mt-5">
          <div className="col-md-4 mb-4">
            <div className="about-card p-4 text-center shadow-sm animate__animated animate__fadeInUp">
              <h3 className="h4 mb-3">Users Engaged</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={usersEngagedData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {usersEngagedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-muted">
                <strong>75%</strong> of users are actively engaged with the platform.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="about-card p-4 text-center shadow-sm animate__animated animate__fadeInUp animate__delay-1s">
              <h3 className="h4 mb-3">Health Data Tracked</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={healthDataTrackedData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {healthDataTrackedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-muted">
                <strong>60%</strong> of users track their weight, and <strong>40%</strong> track their height.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="about-card p-4 text-center shadow-sm animate__animated animate__fadeInUp animate__delay-2s">
              <h3 className="h4 mb-3">Goals Achieved</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={goalsAchievedData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {goalsAchievedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-muted">
                <strong>80%</strong> of users have achieved their health goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;