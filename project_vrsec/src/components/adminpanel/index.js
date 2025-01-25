import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBell, FaUsers, FaPaperPlane } from "react-icons/fa";
import "./index.css"; // Custom CSS for vibrant colors and animations

const Navbar = () => {
  const [open, setOpen] = useState(false); // State to control the dialog
  const [message, setMessage] = useState(""); // State to store the message

  // Open the notification dialog
  const handleOpen = () => {
    setOpen(true);
  };

  // Close the notification dialog
  const handleClose = () => {
    setOpen(false);
    setMessage(""); // Clear the message
  };

  // Send the notification to all users
  const sendNotification = () => {
    if (message.trim() === "") {
      toast.error("Please enter a message.");
      return;
    }

    // Simulate sending a notification (replace with actual API call)
    toast.success(`Notification sent: "${message}"`);
    handleClose(); // Close the dialog
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span className="fw-bold">Admin Portal</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  <FaUsers className="me-2" />
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleOpen}>
                  <FaBell className="me-2" />
                  Notifications
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Notification Dialog */}
      <div
        className={`modal fade ${open ? "show" : ""}`}
        style={{ display: open ? "block" : "none" }}
        tabIndex="-1"
        aria-labelledby="notificationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="notificationModalLabel">
                <FaPaperPlane className="me-2" />
                Send Notification to All Users
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <textarea
                className="form-control"
                rows="4"
                placeholder="Enter your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={sendNotification}
              >
                <FaPaperPlane className="me-2" />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Navbar;