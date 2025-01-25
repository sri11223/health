import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaWalking, FaHeartbeat, FaBed, FaDumbbell, FaCog, FaShareAlt } from 'react-icons/fa';
import { FiFacebook, FiTwitter, FiInstagram, FiShare2 } from 'react-icons/fi';
import Data from '../calender/Data.json';
import motivationalUpdates from '../calender/motivational.json';
import { Container, Row, Col, Card, Modal, Button, Form } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

// MotivationalUpdateCard Component
const MotivationalUpdateCard = ({ motivationalUpdate }) => {
  const colors = {
    background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
    cardBackground: 'linear-gradient(135deg, #a8edea, #fed6e3)',
    highlight: '#ff6b6b',
    text: '#2c3e50',
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const textVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.5 } },
  };

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible">
      <Card
        className="motivational-update-card"
        style={{
          background: colors.cardBackground,
          border: 'none',
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          margin: '1rem 0',
        }}
      >
        <Card.Body style={{ padding: '2rem', textAlign: 'center' }}>
          <motion.p
            variants={textVariants}
            style={{
              color: colors.text,
              fontSize: '1.5rem',
              fontWeight: '600',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '1.5rem',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              borderLeft: `6px solid ${colors.highlight}`,
              fontStyle: 'italic',
              lineHeight: '1.6',
            }}
          >
            "{motivationalUpdate}"
          </motion.p>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

// GoalAchievedNotification Component
const GoalAchievedNotification = ({ show, message }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="goal-achieved-notification bomb-blast"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// CalendarSection Component
const CalendarSection = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 0, 1)); // Set to January 1, 2024
  const [dailyData, setDailyData] = useState(null);
  const [motivationalUpdate, setMotivationalUpdate] = useState('');
  const [streakCount, setStreakCount] = useState(0);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [streakMessage, setStreakMessage] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [goals, setGoals] = useState({
    steps: 10000,
    calories: 2000,
    sleep: 8,
  });
  const [showGoalAchieved, setShowGoalAchieved] = useState(false);
  const [goalAchievedMessage, setGoalAchievedMessage] = useState('');

  // Load data for the selected date
  useEffect(() => {
    const selectedDateString = selectedDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const dataForSelectedDate = Data.dailyData.find(
      (day) => day.date === selectedDateString
    );
    setDailyData(dataForSelectedDate || null);

    // Get the motivational update based on the selected date
    const dayOfMonth = selectedDate.getDate();
    const update = motivationalUpdates.motivationalUpdates.find(
      (update) => update.id === dayOfMonth
    );
    setMotivationalUpdate(update ? update.message : 'Stay motivated and keep pushing!');

    // Show Toastify notification based on the selected date
    showToastNotification(dayOfMonth);

    // Check if the user achieved their goals for the selected date
    if (dataForSelectedDate && dataForSelectedDate.workoutPlanAchieved) {
      setStreakCount((prevStreak) => prevStreak + 1); // Increment streak count
    } else {
      setStreakCount(0); // Reset streak count
    }
  }, [selectedDate]);

  // Check if goals are achieved
  useEffect(() => {
    if (dailyData) {
      if (dailyData.steps >= goals.steps) {
        setGoalAchievedMessage('🎉 You achieved your daily steps goal!');
        setShowGoalAchieved(true);
        setTimeout(() => setShowGoalAchieved(false), 3000);
      }
      if (dailyData.caloriesBurned >= goals.calories) {
        setGoalAchievedMessage('🔥 You burned your target calories!');
        setShowGoalAchieved(true);
        setTimeout(() => setShowGoalAchieved(false), 3000);
      }
      if (dailyData.sleep >= goals.sleep) {
        setGoalAchievedMessage('😴 You met your sleep goal!');
        setShowGoalAchieved(true);
        setTimeout(() => setShowGoalAchieved(false), 3000);
      }
    }
  }, [dailyData, goals]);

  // Show streak modal when the user reaches 3, 7, or 10 days
  useEffect(() => {
    if (streakCount === 3 || streakCount === 7 || streakCount === 10) {
      setStreakMessage(`🎉 Congratulations! You've achieved a ${streakCount}-day streak!`);
      setShowStreakModal(true);
    }
  }, [streakCount]);

  // Function to show Toastify notifications
  const showToastNotification = (dayOfMonth) => {
    let message = '';
    switch (dayOfMonth) {
      case 1:
        message = '🎉 New month, new goals! Start strong!';
        break;
      case 10:
        message = '🔥 You’re 1/3 of the way through the month. Keep it up!';
        break;
      case 20:
        message = '💪 Only 10 days left. Finish the month strong!';
        break;
      case 31:
        message = '🌟 You made it to the end of the month! Celebrate your progress!';
        break;
      default:
        message = `Today is day ${dayOfMonth}. Keep pushing forward!`;
    }
    toast.info(message, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Function to handle goal changes
  const handleGoalChange = (e) => {
    const { name, value } = e.target;
    setGoals((prevGoals) => ({
      ...prevGoals,
      [name]: parseInt(value, 10),
    }));
  };

  // Function to share achievements on social media
  const shareAchievement = (platform) => {
    const message = `I just completed a ${streakCount}-day streak! 🎉 Check out my progress!`;
    const url = window.location.href;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message + ' ' + url)}`;
        break;
      case 'instagram':
        shareUrl = `https://www.instagram.com/`;
        break;
      default:
        break;
    }

    window.open(shareUrl, '_blank');
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  // Generate all dates for January 2024
  const januaryDates = Array.from({ length: 31 }, (_, index) => {
    const date = new Date(2024, 0, index + 1);
    return date;
  });

  // Get the first day of January 2024
  const firstDayOfMonth = new Date(2024, 0, 1).getDay();

  return (
    <div className="calendar-section">
      {/* Toastify Container */}
      <ToastContainer />

      {/* Goal Achieved Notification */}
      <GoalAchievedNotification show={showGoalAchieved} message={goalAchievedMessage} />

      {/* Streak Indicator */}
      <div className="streak-indicator" style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h4 style={{ color: '#ff6b6b', fontWeight: 'bold' }}>
          🔥 Streak: {streakCount} days
        </h4>
      </div>

      {/* Streak Modal */}
      <Modal show={showStreakModal} onHide={() => setShowStreakModal(false)} centered>
        <Modal.Body
          style={{
            background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
            borderRadius: '15px',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: '#2c3e50', fontWeight: 'bold', marginBottom: '1.5rem' }}>Streak Achieved!</h3>
          <p style={{ color: '#2c3e50', fontSize: '1.2rem' }}>{streakMessage}</p>
          <Button
            variant="light"
            onClick={() => setShowStreakModal(false)}
            style={{
              marginTop: '1.5rem',
              borderRadius: '10px',
              fontWeight: '600',
              backgroundColor: '#ffffff',
              color: '#ff6b6b',
              border: 'none',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>

      {/* Settings Modal */}
      <Modal show={showSettings} onHide={() => setShowSettings(false)} centered>
        <Modal.Body
          style={{
            background: 'linear-gradient(135deg, #a8edea, #fed6e3)',
            borderRadius: '15px',
            padding: '2rem',
          }}
        >
          <h3 style={{ color: '#2c3e50', fontWeight: 'bold', marginBottom: '1.5rem' }}>Set Your Goals</h3>
          <Form>
            <Form.Group controlId="stepsGoal">
              <Form.Label>Daily Steps Goal</Form.Label>
              <Form.Control
                type="number"
                name="steps"
                value={goals.steps}
                onChange={handleGoalChange}
              />
            </Form.Group>
            <Form.Group controlId="caloriesGoal">
              <Form.Label>Daily Calories Goal</Form.Label>
              <Form.Control
                type="number"
                name="calories"
                value={goals.calories}
                onChange={handleGoalChange}
              />
            </Form.Group>
            <Form.Group controlId="sleepGoal">
              <Form.Label>Daily Sleep Goal (hours)</Form.Label>
              <Form.Control
                type="number"
                name="sleep"
                value={goals.sleep}
                onChange={handleGoalChange}
              />
            </Form.Group>
          </Form>
          <Button
            variant="light"
            onClick={() => setShowSettings(false)}
            style={{
              marginTop: '1.5rem',
              borderRadius: '10px',
              fontWeight: '600',
              backgroundColor: '#ffffff',
              color: '#ff6b6b',
              border: 'none',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            Save
          </Button>
        </Modal.Body>
      </Modal>

      {/* Share Modal */}
      <Modal show={showShareModal} onHide={() => setShowShareModal(false)} centered>
        <Modal.Body
          style={{
            background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
            borderRadius: '15px',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: '#2c3e50', fontWeight: 'bold', marginBottom: '1.5rem' }}>Share Your Achievement</h3>
          <div className="share-buttons">
            <Button
              variant="light"
              onClick={() => shareAchievement('facebook')}
              style={{
                margin: '0.5rem',
                borderRadius: '10px',
                fontWeight: '600',
                backgroundColor: '#ffffff',
                color: '#3b5998',
                border: 'none',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <FiFacebook size={20} style={{ marginRight: '0.5rem' }} /> Facebook
            </Button>
            <Button
              variant="light"
              onClick={() => shareAchievement('twitter')}
              style={{
                margin: '0.5rem',
                borderRadius: '10px',
                fontWeight: '600',
                backgroundColor: '#ffffff',
                color: '#1da1f2',
                border: 'none',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <FiTwitter size={20} style={{ marginRight: '0.5rem' }} /> Twitter
            </Button>
            <Button
              variant="light"
              onClick={() => shareAchievement('whatsapp')}
              style={{
                margin: '0.5rem',
                borderRadius: '10px',
                fontWeight: '600',
                backgroundColor: '#ffffff',
                color: '#25d366',
                border: 'none',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <FiShare2 size={20} style={{ marginRight: '0.5rem' }} /> WhatsApp
            </Button>
            <Button
              variant="light"
              onClick={() => shareAchievement('instagram')}
              style={{
                margin: '0.5rem',
                borderRadius: '10px',
                fontWeight: '600',
                backgroundColor: '#ffffff',
                color: '#e1306c',
                border: 'none',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <FiInstagram size={20} style={{ marginRight: '0.5rem' }} /> Instagram
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Calendar Icon */}
      <div className="calendar-icon" onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
        <FaCalendarAlt size={24} color="#00C853" />
      </div>

      {/* Calendar Popup */}
      {isCalendarOpen && (
        <div className="calendar-popup">
          <div className="custom-calendar">
            <div className="calendar-header">
              <button onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}>
                &lt;
              </button>
              <h3>
                {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
              </h3>
              <button onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}>
                &gt;
              </button>
            </div>
            <div className="calendar-grid">
              {/* Weekday Headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="calendar-day">
                  {day}
                </div>
              ))}

              {/* Empty cells for days before the first day of the month */}
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} className="calendar-date empty"></div>
              ))}

              {/* Days of January 2024 */}
              {januaryDates.map((date, index) => (
                <div
                  key={index}
                  className={`calendar-date ${
                    date.toDateString() === selectedDate.toDateString() ? 'active' : ''
                  }`}
                  onClick={() => handleDateChange(date)}
                >
                  {date.getDate()}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scrollable Dates Section */}
      <div className="scrollable-dates">
        {januaryDates.map((date, index) => (
          <div
            key={index}
            className={`date-card ${date.toDateString() === selectedDate.toDateString() ? 'active' : ''}`}
            onClick={() => handleDateChange(date)}
          >
            <div className="date-day">{date.toLocaleString('default', { weekday: 'short' })}</div>
            <div className="date-number">{date.getDate()}</div>
          </div>
        ))}
      </div>

      {/* Display Data for Selected Date */}
      {dailyData && (
        <div className="daily-data">
          <h3>Data for {selectedDate.toLocaleDateString()}</h3>

          {/* Motivational Update Section */}
          <MotivationalUpdateCard motivationalUpdate={motivationalUpdate} />

          {/* Progress Bar for Daily Goals */}
          <div className="progress-section">
            <h4>Daily Progress</h4>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${(dailyData.steps / goals.steps) * 100}%` }}></div>
            </div>
            <p>{dailyData.steps} / {goals.steps} steps</p>
          </div>

          {/* Achievement Badges */}
          <div className="badges-section">
            <h4>Achievements</h4>
            <div className="badges">
              {streakCount >= 3 && <span className="badge">🔥 3-Day Streak</span>}
              {streakCount >= 7 && <span className="badge">🌟 7-Day Streak</span>}
              {streakCount >= 10 && <span className="badge">🎉 10-Day Streak</span>}
            </div>
          </div>

          {/* Steps, Heart Rate, Sleep, and Workout Plan Cards */}
          <Row className="g-4">
            {/* Steps Card */}
            <Col md={6} lg={3}>
              <Card className="text-center shadow-sm border-0" style={{ background: "linear-gradient(135deg, #4facfe, #00f2fe)" }}>
                <Card.Body>
                  <FaWalking size={40} className="text-white mb-3" />
                  <Card.Title className="text-white">Steps</Card.Title>
                  <Card.Text className="text-white">
                    {dailyData.steps} steps <br /> Goal: {goals.steps} <br /> Remaining: {goals.steps - dailyData.steps}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Heart Rate Card */}
            <Col md={6} lg={3}>
              <Card className="text-center shadow-sm border-0" style={{ background: "linear-gradient(135deg, #ff6b6b, #ffa5a5)" }}>
                <Card.Body>
                  <FaHeartbeat size={40} className="text-white mb-3" />
                  <Card.Title className="text-white">Heart Rate</Card.Title>
                  <Card.Text className="text-white">
                    {dailyData.heartRate} bpm <br /> Resting: 60 bpm <br /> Peak: 120 bpm
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Sleep Card */}
            <Col md={6} lg={3}>
              <Card className="text-center shadow-sm border-0" style={{ background: "linear-gradient(135deg, #6a82fb, #8e9efc)" }}>
                <Card.Body>
                  <FaBed size={40} className="text-white mb-3" />
                  <Card.Title className="text-white">Sleep</Card.Title>
                  <Card.Text className="text-white">
                    {dailyData.sleep} hours <br /> Goal: {goals.sleep} hours <br /> Remaining: {goals.sleep - dailyData.sleep}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Workout Plan Card */}
            <Col md={6} lg={3}>
              <Card className="text-center shadow-sm border-0" style={{ background: "linear-gradient(135deg, #43e97b, #38f9d7)" }}>
                <Card.Body>
                  <FaDumbbell size={40} className="text-white mb-3" />
                  <Card.Title className="text-white">Workout Plan</Card.Title>
                  <Card.Text className="text-white">
                    {dailyData.workoutPlanAchieved ? '✅ Achieved' : '❌ Not Achieved'} <br /> Exercises: 5 <br /> Duration: 45 mins
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Combined Daily Goals and Diet Plan Section */}
          <Card className="daily-goals-card">
            <Card.Body>
              <Row>
                {/* Daily Goals Section */}
                <Col md={6} className="daily-goals">
                  <h3>Daily Goals</h3>

                  {/* Calories Section */}
                  <div className="calories-section">
                    <div className="calories-progress">
                      <div className="calories-text">
                        <strong>{dailyData.caloriesBurned}</strong> of {goals.calories} kcal
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress"
                          style={{
                            width: `${(dailyData.caloriesBurned / goals.calories) * 100}%`,
                            backgroundColor: '#00C853',
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Diet Plan Section */}
                <Col md={6} className="diet-plan">
                  <h4>Diet Plan</h4>
                  <div className="diet-item">
                    <div className="diet-label">Protein</div>
                    <div className="diet-progress">
                      <div
                        className="progress"
                        style={{
                          width: `${(parseInt(dailyData.diet.protein.split('/')[0], 10) / parseInt(dailyData.diet.protein.split('/')[1], 10)) * 100}%`,
                          backgroundColor: '#FF5252',
                        }}
                      ></div>
                    </div>
                    <div className="diet-value">
                      {dailyData.diet.protein}
                    </div>
                  </div>
                  <div className="diet-item">
                    <div className="diet-label">Carbs</div>
                    <div className="diet-progress">
                      <div
                        className="progress"
                        style={{
                          width: `${(parseInt(dailyData.diet.carbs.split('/')[0], 10) / parseInt(dailyData.diet.carbs.split('/')[1], 10)) * 100}%`,
                          backgroundColor: '#FFC107',
                        }}
                      ></div>
                    </div>
                    <div className="diet-value">
                      {dailyData.diet.carbs}
                    </div>
                  </div>
                  <div className="diet-item">
                    <div className="diet-label">Fats</div>
                    <div className="diet-progress">
                      <div
                        className="progress"
                        style={{
                          width: `${(parseInt(dailyData.diet.fats.split('/')[0], 10) / parseInt(dailyData.diet.fats.split('/')[1], 10)) * 100}%`,
                          backgroundColor: '#00C853',
                        }}
                      ></div>
                    </div>
                    <div className="diet-value">
                      {dailyData.diet.fats}
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Customizable Goals and Social Sharing Buttons */}
          <div className="action-buttons" style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Button
              variant="primary"
              onClick={() => setShowSettings(true)}
              style={{
                marginRight: '1rem',
                borderRadius: '10px',
                fontWeight: '600',
                backgroundColor: '#4a90e2',
                border: 'none',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <FaCog size={20} style={{ marginRight: '0.5rem' }} /> Customize Goals
            </Button>
            <Button
              variant="success"
              onClick={() => setShowShareModal(true)}
              style={{
                borderRadius: '10px',
                fontWeight: '600',
                backgroundColor: '#43e97b',
                border: 'none',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <FaShareAlt size={20} style={{ marginRight: '0.5rem' }} /> Share Achievement
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarSection;