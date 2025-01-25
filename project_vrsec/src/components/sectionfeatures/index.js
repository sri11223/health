import React from "react";
import {
  FaUsers,
  FaHeartbeat,
  FaBell,
  FaMobileAlt,
  FaShieldAlt,
  FaChartLine,
  FaUserLock,
  FaSync,
  FaCogs,
  FaChartBar,
  FaFileExport,
  FaDatabase,
  FaRegChartBar,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // Custom CSS for animations

const Features = () => {
  return (
    <section id="features" className="features-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold">Why Choose Us?</h2>
        <div className="row g-4">
          {/* Feature 1: User Management */}
          <div className="col-md-4">
            <div className="feature-card p-4 text-center shadow-sm animate__animated animate__fadeInUp">
              <div className="icon-wrapper mb-3">
                <FaUsers className="feature-icon text-primary" />
              </div>
              <h3 className="h4 mb-3">Advanced User Management</h3>
              <p className="text-muted">
                Admins can easily manage user profiles, roles, and permissions with our intuitive dashboard.
              </p>
            </div>
          </div>

          {/* Feature 2: Health Data Tracking */}
          <div className="col-md-4">
            <div className="feature-card p-4 text-center shadow-sm animate__animated animate__fadeInUp animate__delay-1s">
              <div className="icon-wrapper mb-3">
                <FaHeartbeat className="feature-icon text-danger" />
              </div>
              <h3 className="h4 mb-3">Comprehensive Health Tracking</h3>
              <p className="text-muted">
                Users can track and update their health metrics, including age, gender, height, weight, and more.
              </p>
            </div>
          </div>

          {/* Feature 3: Notifications */}
          <div className="col-md-4">
            <div className="feature-card p-4 text-center shadow-sm animate__animated animate__fadeInUp animate__delay-2s">
              <div className="icon-wrapper mb-3">
                <FaBell className="feature-icon text-warning" />
              </div>
              <h3 className="h4 mb-3">Real-Time Notifications</h3>
              <p className="text-muted">
                Admins can send instant notifications to users, ensuring timely communication and updates.
              </p>
            </div>
          </div>

          {/* Feature 4: Responsive Design */}
          <div className="col-md-4">
            <div className="feature-card p-4 text-center shadow-sm animate__animated animate__fadeInUp animate__delay-3s">
              <div className="icon-wrapper mb-3">
                <FaMobileAlt className="feature-icon text-info" />
              </div>
              <h3 className="h4 mb-3">Fully Responsive Design</h3>
              <p className="text-muted">
                Our platform is optimized for all devices, providing a seamless experience on desktops, tablets, and mobiles.
              </p>
            </div>
          </div>

          {/* Feature 5: Secure Authentication */}
          <div className="col-md-4">
            <div className="feature-card p-4 text-center shadow-sm animate__animated animate__fadeInUp animate__delay-4s">
              <div className="icon-wrapper mb-3">
                <FaShieldAlt className="feature-icon text-success" />
              </div>
              <h3 className="h4 mb-3">Military-Grade Security</h3>
              <p className="text-muted">
                We use advanced encryption and authentication protocols to ensure your data is always safe.
              </p>
            </div>
          </div>

          {/* Feature 6: Advanced Analytics */}
          <div className="col-md-4">
            <div className="feature-card p-4 text-center shadow-sm animate__animated animate__fadeInUp animate__delay-5s">
              <div className="icon-wrapper mb-3">
                <FaChartLine className="feature-icon text-purple" />
              </div>
              <h3 className="h4 mb-3">Advanced Analytics</h3>
              <p className="text-muted">
                Gain insights into user behavior and health trends with our powerful analytics dashboard.
              </p>
            </div>
          </div>

          {/* Feature 7: Role-Based Access */}
          <div className="col-md-4">
            <div className="feature-card p-4 text-center shadow-sm animate__animated animate__fadeInUp animate__delay-6s">
              <div className="icon-wrapper mb-3">
                <FaUserLock className="feature-icon text-orange" />
              </div>
              <h3 className="h4 mb-3">Role-Based Access Control</h3>
              <p className="text-muted">
                Assign roles and permissions to users, ensuring secure and efficient access management.
              </p>
            </div>
          </div>

          {/* Feature 8: Data Synchronization */}
          <div className="col-md-4">
            <div className="feature-card p-4 text-center shadow-sm animate__animated animate__fadeInUp animate__delay-7s">
              <div className="icon-wrapper mb-3">
                <FaSync className="feature-icon text-teal" />
              </div>
              <h3 className="h4 mb-3">Real-Time Data Sync</h3>
              <p className="text-muted">
                All user data is synchronized in real-time across devices, ensuring consistency and accuracy.
              </p>
            </div>
          </div>

          {/* Feature 9: Customizable Settings */}
          <div className="col-md-4">
            <div className="feature-card p-4 text-center shadow-sm animate__animated animate__fadeInUp animate__delay-8s">
              <div className="icon-wrapper mb-3">
                <FaCogs className="feature-icon text-pink" />
              </div>
              <h3 className="h4 mb-3">Customizable Settings</h3>
              <p className="text-muted">
                Admins can customize the platform settings to meet their specific needs and preferences.
              </p>
            </div>
          </div>

          {/* Feature 10: Data Visualization */}
          <div className="col-md-4">
            <div className="feature-card p-4 text-center shadow-sm animate__animated animate__fadeInUp animate__delay-9s">
              <div className="icon-wrapper mb-3">
                <FaChartBar className="feature-icon text-indigo" />
              </div>
              <h3 className="h4 mb-3">Interactive Data Visualization</h3>
              <p className="text-muted">
                Visualize health trends and user data with interactive charts, graphs, and dashboards.
              </p>
            </div>
          </div>

          {/* Feature 11: Export Reports */}
          <div className="col-md-4">
            <div className="feature-card p-4 text-center shadow-sm animate__animated animate__fadeInUp animate__delay-10s">
              <div className="icon-wrapper mb-3">
                <FaFileExport className="feature-icon text-brown" />
              </div>
              <h3 className="h4 mb-3">Export Reports</h3>
              <p className="text-muted">
                Generate and export detailed reports in PDF, CSV, or Excel formats for further analysis.
              </p>
            </div>
          </div>

          {/* Feature 12: Big Data Integration */}
          <div className="col-md-4">
            <div className="feature-card p-4 text-center shadow-sm animate__animated animate__fadeInUp animate__delay-11s">
              <div className="icon-wrapper mb-3">
                <FaDatabase className="feature-icon text-cyan" />
              </div>
              <h3 className="h4 mb-3">Big Data Integration</h3>
              <p className="text-muted">
                Seamlessly integrate with big data platforms for advanced analytics and insights.
              </p>
            </div>
          </div>

          {/* Feature 13: Predictive Analytics */}
          <div className="col-md-4">
            <div className="feature-card p-4 text-center shadow-sm animate__animated animate__fadeInUp animate__delay-12s">
              <div className="icon-wrapper mb-3">
                <FaRegChartBar className="feature-icon text-deep-purple" />
              </div>
              <h3 className="h4 mb-3">Predictive Analytics</h3>
              <p className="text-muted">
                Leverage machine learning models to predict health trends and user behavior.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;