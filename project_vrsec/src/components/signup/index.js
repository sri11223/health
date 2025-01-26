import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", username: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = { email: "", password: "", username: "" };
    let isValid = true;

    if (!username) {
      newErrors.username = "Username is required.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email.";
      isValid = false;
    }

    if (!password || password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setLoading(true);
      try {
        const user = { email, password, username };

        const response = await fetch("https://health-1-71qg.onrender.com/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const result = await response.json();
        setLoading(false);

        if (response.ok === true) {
          console.log(result);
          Cookies.set("authToken", result.token, { expires: 30 });
          Cookies.set("userID", result.userId, { expires: 30 });

          toast.success("Registration successful! Redirecting to questions page...", {
            autoClose: 2000,
            onClose: () => navigate("/questionpage", { state: { userId: result.userId } }),
          });

          setEmail("");
          setPassword("");
          setUsername("");
        } else {
          toast.error(result.message || "Signup failed. Please try again.");
        }
      } catch (error) {
        setLoading(false);
        toast.error("Network error. Please try again later.");
      }
    } else {
      if (newErrors.username) toast.error(newErrors.username);
      if (newErrors.email) toast.error(newErrors.email);
      if (newErrors.password) toast.error(newErrors.password);
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center bg-light" style={{ minHeight: "100vh" }}>
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
        <motion.div
          className="col-lg-6 d-none d-lg-block position-relative"
          style={{
            backgroundImage: 'url("https://img.freepik.com/free-vector/smart-training-abstract-concept-vector-illustration-smart-training-online-programs-tools-new-gym-technology-fitness-coaching-application-improve-health-fat-loss-toning-abstract-metaphor_335657-1445.jpg?t=st=1737714989~exp=1737718589~hmac=17cac9a81e3ec23ae58fa9447adb74fceab56d17374ab9531fcf2c8bd2fbee9e&w=740")',
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
            <h1 className="display-4 fw-bold mb-4">Welcome to Health Assistant</h1>
            <p className="lead text-center">
              Join us to take control of your health and wellness. Track your fitness, diet, and progress with ease.
            </p>
            <p className="text-center">
              "Your health is an investment, not an expense."
            </p>
          </div>
        </motion.div>

        <motion.div
          className="col-lg-6 col-12 d-flex justify-content-center align-items-center p-4"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="card shadow-lg w-100" style={{ maxWidth: "500px", borderRadius: "15px" }}>
            <div className="card-body p-4">
              <h3 className="card-title text-center mb-4">Sign Up</h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label" style={{ color: "black" }}>
                    <FaUser className="me-2" />
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`form-control ${errors.username ? "is-invalid" : ""}`}
                    placeholder="Enter your username"
                  />
                </div>

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

                <div className="d-flex justify-content-between align-items-center">
                  <motion.button
                    type="submit"
                    className="btn btn-primary w-100 mb-2"
                    disabled={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {loading ? "Signing Up..." : "Sign Up"}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SignupForm;
