import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa'; // Import icons
import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {
  return (
    <section className="py-5" style={{ backgroundColor: '#E8F5E9', width: '100%' }}> {/* Updated background color */}
      <div className="container-fluid"> {/* Use container-fluid for full width */}
        <div className="row g-4">
          {/* Logo and Description */}
          <div className="col-md-6 col-lg-4">
            <Navbar.Brand href="#home" style={{ color: '#0d6efd', fontWeight: 'bold', fontSize: '1.5rem' }}>
              <i className="fas fa-heartbeat me-2"></i>Health Assistant
            </Navbar.Brand>
            <p className="text-muted mt-3">
              Your personalized health assistant for fitness, diet, and wellness. Achieve your goals with tailored solutions.
            </p>
            <ul className="list-inline mt-4">
              <li className="list-inline-item">
                <a
                  href="#"
                  className="text-decoration-none text-dark bg-white rounded-circle p-2 d-inline-flex align-items-center justify-content-center"
                  style={{ width: '40px', height: '40px' }}
                >
                  <FaTwitter />
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="#"
                  className="text-decoration-none text-dark bg-white rounded-circle p-2 d-inline-flex align-items-center justify-content-center"
                  style={{ width: '40px', height: '40px' }}
                >
                  <FaFacebook />
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="#"
                  className="text-decoration-none text-dark bg-white rounded-circle p-2 d-inline-flex align-items-center justify-content-center"
                  style={{ width: '40px', height: '40px' }}
                >
                  <FaInstagram />
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="#"
                  className="text-decoration-none text-dark bg-white rounded-circle p-2 d-inline-flex align-items-center justify-content-center"
                  style={{ width: '40px', height: '40px' }}
                >
                  <FaGithub />
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-md-6 col-lg-2">
            <h6 className="text-uppercase text-secondary mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-dark">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-dark">
                  Features
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-dark">
                  Plans
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-dark">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-md-6 col-lg-2">
            <h6 className="text-uppercase text-secondary mb-3">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-dark">
                  Help Center
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-dark">
                  FAQs
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-dark">
                  Terms & Conditions
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-dark">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-md-6 col-lg-4">
            <h6 className="text-uppercase text-secondary mb-3">Subscribe to Newsletter</h6>
            <form>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  aria-label="Email"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-5" />

        {/* Copyright */}
        <p className="text-center text-muted mb-0">
          © {new Date().getFullYear()} Health Assistant. All Rights Reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;