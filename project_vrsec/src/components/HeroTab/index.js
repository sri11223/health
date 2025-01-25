import React from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FaDumbbell, FaUtensils, FaHeartbeat, FaChartLine, FaChartBar, FaBrain, FaHeart } from 'react-icons/fa'; // Import icons

const HeroSection = () => {
  // Calculate positions for the circular layout
  const radius = 150; // Radius of the circle
  const centerX = 0; // Center X position
  const centerY = 0; // Center Y position
  const angle = (2 * Math.PI) / 6; // Angle between each icon

  const iconPositions = Array.from({ length: 6 }).map((_, index) => {
    const x = centerX + radius * Math.cos(angle * index);
    const y = centerY + radius * Math.sin(angle * index);
    return { x, y };
  });

  return (
    <div className="py-5" style={{ backgroundColor: '#E8F5E9' }}>
      <div className="container">
        <div className="row align-items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="text-primary fw-bold text-uppercase mb-3">
              Your Personalized Health Companion
            </p>
            <h1 className="display-4 fw-bold text-dark mb-4">
              Achieve Your Health Goals
            </h1>
            <p className="lead text-dark mb-5">
              Get customized workout plans, diet recommendations, and real-time progress tracking to transform your health.
            </p>

            {/* Call to Action Button */}
            <motion.a
              href="#"
              className="btn btn-warning btn-lg d-inline-flex align-items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Get Started
              <svg
                className="ms-3"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 9L16 12L13 15M16 12H8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>

            {/* Login Link */}
            <p className="mt-4 text-muted">
              Already a member?{' '}
              <a href="#" className="text-success text-decoration-none">
                Log in
              </a>
            </p>
          </motion.div>

          {/* Right Column - Circular Icon Layout */}
          <motion.div
            className="col-lg-6 d-flex justify-content-center align-items-center"
            style={{ height: '400px', position: 'relative' }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            {/* Central Icon - Well-Being */}
           

            {/* Circular Icons */}
            {[
              { icon: FaDumbbell, text: 'Workout', color: '#FFD600' },
              { icon: FaUtensils, text: 'Diet', color: '#00C853' },
              { icon: FaHeartbeat, text: 'Health', color: '#FF0000' },
              { icon: FaChartLine, text: 'Dashboard', color: '#00B8D4' },
              { icon: FaChartBar, text: 'Progress', color: '#6C757D' },
              { icon: FaBrain, text: 'AI Insights', color: '#6610F2' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="position-absolute"
                style={{
                  left: `calc(50% + ${iconPositions[index].x}px)`,
                  top: `calc(50% + ${iconPositions[index].y}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.2, ease: 'easeOut' }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="text-center">
                    <item.icon className="mb-3" size={48} style={{ color: item.color }} />
                    <p className="fw-bold text-dark">{item.text}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;