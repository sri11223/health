import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = { email: "", password: "" };
    let isValid = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email.";
      isValid = false;
    }

    // Password validation
    if (!password || password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setLoading(true);
      try {
        const user = { email, password };

        const response = await fetch("https://health-1-71qg.onrender.com/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const result = await response.json();
        setLoading(false);

        if (response.ok) {
          Cookies.set("authToken", result.token, { expires: 30 }); // Save token in cookies
          Cookies.set("userID", result.userId, { expires: 30 });
          toast.success("Login successful! Redirecting to dashboard...", {
            autoClose: 2000,
            onClose: () => navigate("/questionpage"),
          });
        } else {
          toast.error(result.message || "Invalid credentials. Please try again.");
        }
      } catch (error) {
        setLoading(false);
        toast.error("Network error. Please try again later.");
      }
    } else {
      // Show validation errors as toast notifications
      if (newErrors.email) toast.error(newErrors.email);
      if (newErrors.password) toast.error(newErrors.password);
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center bg-light" style={{ minHeight: "100vh" }}>
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="row w-100">
        {/* Left Side - Image with Text Overlay */}
        <motion.div
          className="col-lg-6 d-none d-lg-block position-relative"
          style={{
            backgroundImage: 'url("https://img.freepik.com/free-vector/business-background-design_1300-358.jpg?t=st=1737715345~exp=1737718945~hmac=039db4053923543a7c72866815cd353b383d91aa473834c6bc579b664e3cb6e0&w=740")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
          }}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="position-absolute top-0 start-0 end-0 bottom-0 d-flex flex-column justify-content-center align-items-center text-white p-5"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <h1 className="display-4 fw-bold mb-4">Welcome Back!</h1>
            <p className="lead text-center">
              Login to continue your health and wellness journey. Track your fitness, diet, and progress with ease.
            </p>
            <p className="text-center">
              "Your health is an investment, not an expense."
            </p>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          className="col-lg-6 col-12 d-flex justify-content-center align-items-center p-4"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="card shadow-lg w-100" style={{ maxWidth: "500px", borderRadius: "15px" }}>
            <div className="card-body p-4">
              <h3 className="card-title text-center mb-4">Login</h3>

              <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label" style={{ color: "black" }}>
                    <FaEnvelope className="me-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label" style={{ color: "black" }}>
                    <FaLock className="me-2" />
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Enter your password"
                  />
                </div>

                {/* Submit Button */}
                <div className="d-flex justify-content-between align-items-center">
                  <motion.button
                    type="submit"
                    className="btn btn-primary w-100 mb-2"
                    disabled={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {loading ? "Logging In..." : "Login"}
                  </motion.button>
                </div>

                {/* Forgot Password Link */}
                <div className="text-center mt-3">
                  <a href="#" className="text-decoration-none text-primary fw-bold">
                    Forgot Password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginForm;
