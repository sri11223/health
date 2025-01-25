import React from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FaHeartbeat, FaDumbbell, FaUtensils, FaChartLine, FaChartBar, FaBrain } from 'react-icons/fa'; // Import icons

const FeaturesSection = () => {
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
    <section className="py-5" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container">
        {/* Section Heading */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="display-4 fw-bold text-dark mb-4">
            Transform Your Health Journey
          </h2>
          <p className="lead text-dark mb-5">
            Discover personalized solutions to achieve your fitness, diet, and wellness goals.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Feature 1: Personalized Workouts */}
          <motion.div className="col" variants={itemVariants}>
            <motion.div
              className="card h-100 border-0 shadow-sm text-center p-4"
              whileHover={{ scale: 1.05, backgroundColor: '#E8F5E9' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaDumbbell className="text-primary mx-auto mb-3" size={48} />
              <h3 className="h4 fw-bold text-dark mb-3">Personalized Workouts</h3>
              <p className="text-muted">
                Get customized workout plans tailored to your fitness level and goals.
              </p>
            </motion.div>
          </motion.div>

          {/* Feature 2: Tailored Diet Plans */}
          <motion.div className="col" variants={itemVariants}>
            <motion.div
              className="card h-100 border-0 shadow-sm text-center p-4"
              whileHover={{ scale: 1.05, backgroundColor: '#E8F5E9' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaUtensils className="text-success mx-auto mb-3" size={48} />
              <h3 className="h4 fw-bold text-dark mb-3">Tailored Diet Plans</h3>
              <p className="text-muted">
                Receive meal plans that match your dietary preferences and health goals.
              </p>
            </motion.div>
          </motion.div>

          {/* Feature 3: Health Tracking */}
          <motion.div className="col" variants={itemVariants}>
            <motion.div
              className="card h-100 border-0 shadow-sm text-center p-4"
              whileHover={{ scale: 1.05, backgroundColor: '#E8F5E9' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaHeartbeat className="text-danger mx-auto mb-3" size={48} />
              <h3 className="h4 fw-bold text-dark mb-3">Health Tracking</h3>
              <p className="text-muted">
                Monitor your health metrics and track progress in real-time.
              </p>
            </motion.div>
          </motion.div>

          {/* Feature 4: Real-Time Dashboard */}
          <motion.div className="col" variants={itemVariants}>
            <motion.div
              className="card h-100 border-0 shadow-sm text-center p-4"
              whileHover={{ scale: 1.05, backgroundColor: '#E8F5E9' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaChartLine className="text-info mx-auto mb-3" size={48} />
              <h3 className="h4 fw-bold text-dark mb-3">Real-Time Dashboard</h3>
              <p className="text-muted">
                Visualize your progress with interactive charts and insights.
              </p>
            </motion.div>
          </motion.div>

          {/* Feature 5: Progress Tracking */}
          <motion.div className="col" variants={itemVariants}>
            <motion.div
              className="card h-100 border-0 shadow-sm text-center p-4"
              whileHover={{ scale: 1.05, backgroundColor: '#E8F5E9' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaChartBar className="text-warning mx-auto mb-3" size={48} />
              <h3 className="h4 fw-bold text-dark mb-3">Progress Tracking</h3>
              <p className="text-muted">
                Stay motivated by tracking your fitness and diet milestones.
              </p>
            </motion.div>
          </motion.div>

          {/* Feature 6: AI Insights */}
          <motion.div className="col" variants={itemVariants}>
            <motion.div
              className="card h-100 border-0 shadow-sm text-center p-4"
              whileHover={{ scale: 1.05, backgroundColor: '#E8F5E9' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaBrain className="text-secondary mx-auto mb-3" size={48} />
              <h3 className="h4 fw-bold text-dark mb-3">AI Insights</h3>
              <p className="text-muted">
                Get actionable insights and recommendations powered by AI.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;