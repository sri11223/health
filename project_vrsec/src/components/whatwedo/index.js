import React from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FaHeartbeat, FaDumbbell, FaUtensils, FaChartLine, FaHandshake, FaRocket } from 'react-icons/fa'; // Import icons

const WhatWeDoPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div style={{ backgroundColor: '#E8F5E9' }}> {/* Updated background color */}
      {/* What We Do Section */}
      <section className="py-5">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="display-5 fw-bold text-dark mb-4">What We Do</h2>
            <p className="lead text-muted">
              We provide tools and guidance to help you achieve your health and wellness goals.
            </p>
          </motion.div>

          <motion.div
            className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Personalized Fitness */}
            <motion.div className="col" variants={itemVariants}>
              <motion.div
                className="card h-100 border-0 shadow-sm text-center p-4"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaDumbbell className="text-warning mx-auto mb-3" size={48} />
                <h3 className="h4 fw-bold text-dark mb-3">Personalized Fitness</h3>
                <p className="text-muted">
                  Tailored workout plans designed to match your fitness level and goals.
                </p>
              </motion.div>
            </motion.div>

            {/* Custom Diet Plans */}
            <motion.div className="col" variants={itemVariants}>
              <motion.div
                className="card h-100 border-0 shadow-sm text-center p-4"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaUtensils className="text-success mx-auto mb-3" size={48} />
                <h3 className="h4 fw-bold text-dark mb-3">Custom Diet Plans</h3>
                <p className="text-muted">
                  Meal plans crafted to fit your dietary preferences and health needs.
                </p>
              </motion.div>
            </motion.div>

            {/* Health Monitoring */}
            <motion.div className="col" variants={itemVariants}>
              <motion.div
                className="card h-100 border-0 shadow-sm text-center p-4"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaHeartbeat className="text-danger mx-auto mb-3" size={48} />
                <h3 className="h4 fw-bold text-dark mb-3">Health Monitoring</h3>
                <p className="text-muted">
                  Track your health metrics and progress in real-time with our advanced tools.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How We Do It Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="display-5 fw-bold text-dark mb-4">How We Do It</h2>
            <p className="lead text-muted">
              Our process is designed to make your health journey seamless and effective.
            </p>
          </motion.div>

          <motion.div
            className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Data-Driven Insights */}
            <motion.div className="col" variants={itemVariants}>
              <motion.div
                className="card h-100 border-0 shadow-sm text-center p-4"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaChartLine className="text-primary mx-auto mb-3" size={48} />
                <h3 className="h4 fw-bold text-dark mb-3">Data-Driven Insights</h3>
                <p className="text-muted">
                  We analyze your data to provide actionable insights and recommendations.
                </p>
              </motion.div>
            </motion.div>

            {/* User-Centric Approach */}
            <motion.div className="col" variants={itemVariants}>
              <motion.div
                className="card h-100 border-0 shadow-sm text-center p-4"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaHandshake className="text-secondary mx-auto mb-3" size={48} />
                <h3 className="h4 fw-bold text-dark mb-3">User-Centric Approach</h3>
                <p className="text-muted">
                  We prioritize your needs and preferences to deliver personalized solutions.
                </p>
              </motion.div>
            </motion.div>

            {/* Seamless Execution */}
            <motion.div className="col" variants={itemVariants}>
              <motion.div
                className="card h-100 border-0 shadow-sm text-center p-4"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaRocket className="text-info mx-auto mb-3" size={48} />
                <h3 className="h4 fw-bold text-dark mb-3">Seamless Execution</h3>
                <p className="text-muted">
                  We ensure smooth implementation of your health plans for maximum results.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WhatWeDoPage;