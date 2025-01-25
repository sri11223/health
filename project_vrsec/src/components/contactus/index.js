import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // Custom CSS for animations

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill out all fields.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      toast.success("Your message has been sent successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Clear the form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <section id="contact-us" className="contact-us-section py-5">
      <div className="container">
        {/* Section Title */}
        <h2 className="text-center mb-5 fw-bold animate__animated animate__fadeInDown">Contact Us</h2>

        <div className="row">
          {/* Contact Form */}
          <div className="col-md-6 mb-4">
            <div className="contact-card p-4 shadow-sm animate__animated animate__fadeInLeft">
              <h3 className="h4 mb-4">Send Us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Enter the subject"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter your message"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="col-md-6 mb-4">
            <div className="contact-card p-4 shadow-sm animate__animated animate__fadeInRight">
              <h3 className="h4 mb-4">Contact Information</h3>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <FaEnvelope className="me-2 text-primary" />
                  <strong>Email:</strong> support@healthassistant.com
                </li>
                <li className="mb-3">
                  <FaPhone className="me-2 text-success" />
                  <strong>Phone:</strong> +1 (123) 456-7890
                </li>
                <li className="mb-3">
                  <FaMapMarkerAlt className="me-2 text-warning" />
                  <strong>Address:</strong> 123 Health Street, Wellness City, WC 12345
                </li>
              </ul>

              {/* Map Integration */}
              <div className="mt-4">
                <iframe
                  title="Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d144.95373531531615!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d6a32f4b4b1d!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1633023222534!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </section>
  );
};

export default ContactUs;