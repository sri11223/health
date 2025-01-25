import React, { useState, useEffect } from 'react';
import { FaFilter, FaFire, FaUtensils, FaCalendar, FaPlus, FaCheck, FaSun, FaMoon, FaTrash } from 'react-icons/fa';
import { Container, Row, Col, Card, Button, Form, Modal, ProgressBar } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dietData from '../dielplans/dirt.json'; // Import the JSON data
import './index.css';

const DietPlansPage = () => {
  // State Management
  const [diets, setDiets] = useState(dietData.diets);
  const [filters, setFilters] = useState({ dietType: '', calorieRange: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [dailyCalories, setDailyCalories] = useState(0);
  const [calorieGoal, setCalorieGoal] = useState(2000); // Default calorie goal
  const [mealLog, setMealLog] = useState([]);
  const [newMeal, setNewMeal] = useState({ name: '', calories: '' });
  const [showMealModal, setShowMealModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [startedPlans, setStartedPlans] = useState([]); // Store started plans
  const [waterIntake, setWaterIntake] = useState(0);
  const [waterGoal, setWaterGoal] = useState(2000); // Default water goal in milliliters
  const [reminder, setReminder] = useState(false);
  const [reminderInterval, setReminderInterval] = useState(60); // Default reminder interval in minutes
  const [timer, setTimer] = useState(null);

  // Handlers
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const filteredDiets = dietData.diets.filter((diet) => {
      return (
        (filters.dietType === '' || diet.type === filters.dietType) &&
        (filters.calorieRange === '' || diet.calories === filters.calorieRange)
      );
    });
    setDiets(filteredDiets);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({ dietType: '', calorieRange: '' });
    setDiets(dietData.diets);
    setShowFilters(false);
  };

  const openDietDetails = (diet) => {
    setSelectedDiet(diet);
  };

  const closeDietDetails = () => {
    setSelectedDiet(null);
  };

  const handleMealChange = (e) => {
    const { name, value } = e.target;
    setNewMeal({ ...newMeal, [name]: value });
  };

  const addMeal = () => {
    if (newMeal.name && newMeal.calories) {
      setMealLog([...mealLog, { ...newMeal, id: mealLog.length + 1 }]);
      setDailyCalories((prevCalories) => prevCalories + parseInt(newMeal.calories, 10));
      setNewMeal({ name: '', calories: '' });
      setShowMealModal(false);
      toast.success('Meal logged successfully!');
    } else {
      toast.error('Please fill out all fields.');
    }
  };

  const removeMeal = (id) => {
    const mealToRemove = mealLog.find((meal) => meal.id === id);
    if (mealToRemove) {
      setDailyCalories((prevCalories) => prevCalories - parseInt(mealToRemove.calories, 10));
      setMealLog(mealLog.filter((meal) => meal.id !== id));
      toast.success('Meal removed successfully!');
    }
  };

  const startPlan = (diet) => {
    setStartedPlans([...startedPlans, diet]);
    toast.success(`🎉 ${diet.name} added to your started plans!`);
    closeDietDetails();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  useEffect(() => {
    if (reminder && reminderInterval > 0) {
      const interval = setInterval(() => {
        toast.info('💧 Time to drink some water!', {
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }, reminderInterval * 60 * 1000);

      setTimer(interval);

      return () => clearInterval(interval);
    } else {
      clearInterval(timer);
      setTimer(null);
    }
  }, [reminder, reminderInterval]);

  return (
    <div className={`diet-plans-page ${darkMode ? 'dark-mode' : ''}`}>
      <ToastContainer />
      <div className="page-header">
        <h1>Diet Plans</h1>
        <p>Find the perfect diet plan for your fitness goals!</p>
        <div className="calorie-tracker">
          <FaFire size={24} />
          <span>Daily Calorie Intake: {dailyCalories} / {calorieGoal} kcal</span>
          <ProgressBar now={(dailyCalories / calorieGoal) * 100} className="calorie-progress" />
        </div>
        <Button variant="primary" onClick={() => setShowFilters(true)}>
          <FaFilter /> Filter Diets
        </Button>
        <Button variant="success" onClick={() => setShowMealModal(true)}>
          <FaPlus /> Log Meal
        </Button>
      </div>

      {/* Filter Modal */}
      <Modal show={showFilters} onHide={() => setShowFilters(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Filter Diets</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="dietType">
              <Form.Label>Diet Type</Form.Label>
              <Form.Control as="select" name="dietType" value={filters.dietType} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="Keto">Keto</option>
                <option value="Vegan">Vegan</option>
                <option value="Low-Carb">Low-Carb</option>
                <option value="Paleo">Paleo</option>
                <option value="Mediterranean">Mediterranean</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="calorieRange">
              <Form.Label>Calorie Range</Form.Label>
              <Form.Control as="select" name="calorieRange" value={filters.calorieRange} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="1200">1200 kcal</option>
                <option value="1500">1500 kcal</option>
                <option value="1800">1800 kcal</option>
                <option value="2000">2000 kcal</option>
                <option value="2500">2500 kcal</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetFilters}>
            Reset Filters
          </Button>
          <Button variant="primary" onClick={applyFilters}>
            Apply Filters
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Diet Plan Cards */}
      <Container>
        <Row className="g-4">
          {diets.map((diet) => (
            <Col key={diet.id} md={6} lg={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="diet-card" onClick={() => openDietDetails(diet)}>
                  <Card.Img
                    variant="top"
                    src={`https://th.bing.com/th?id=OSK.HEROHY8ZO2cX0hTY-7_W5A3RSVO4nhp5VlWY_4sw_5l7Dsg&w=472&h=280&c=1&rs=2&o=6&dpr=1.3&pid=SANGAM`}
                    alt={diet.name}
                  />
                  <Card.Body>
                    <div className="diet-header">
                      <h3>{diet.name}</h3>
                      <div className="diet-details">
                        <div className="calories">
                          <FaFire size={20} />
                          <span>{diet.calories} kcal/day</span>
                        </div>
                        <div className="duration">
                          <FaCalendar size={20} />
                          <span>{diet.duration}</span>
                        </div>
                      </div>
                    </div>
                    <p>{diet.description}</p>
                    <div className="diet-tags">
                      <span className="diet-type">{diet.type}</span>
                      <span className="target-goal">{diet.target}</span>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Diet Details Modal */}
      {selectedDiet && (
        <Modal show={!!selectedDiet} onHide={closeDietDetails} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedDiet.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="diet-instructions">
              <h4>Description:</h4>
              <p>{selectedDiet.description}</p>
            </div>
            <div className="diet-meal-plan">
              <h4>Meal Plan:</h4>
              {selectedDiet.meals.map((meal, index) => (
                <div key={index} className="meal">
                  <h5>{meal.name}</h5>
                  <p>{meal.description}</p>
                  <span>{meal.calories} kcal</span>
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => startPlan(selectedDiet)}>
              <FaCheck /> Start This Plan
            </Button>
            <Button variant="secondary" onClick={closeDietDetails}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Meal Logging Modal */}
      <Modal show={showMealModal} onHide={() => setShowMealModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Log a Meal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="mealName">
              <Form.Label>Meal Name</Form.Label>
              <Form.Control type="text" name="name" value={newMeal.name} onChange={handleMealChange} />
            </Form.Group>
            <Form.Group controlId="mealCalories">
              <Form.Label>Calories</Form.Label>
              <Form.Control type="number" name="calories" value={newMeal.calories} onChange={handleMealChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMealModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={addMeal}>
            Log Meal
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Water Intake Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="water-intake-section"
      >
        <h3>Water Intake Tracker</h3>
        <div className="water-intake-tracker">
          <div className="water-intake-progress">
            <ProgressBar now={(waterIntake / waterGoal) * 100} label={`${waterIntake} / ${waterGoal} ml`} />
          </div>
          <div className="water-intake-controls">
            <Button variant="primary" onClick={() => setWaterIntake(waterIntake + 250)}>
              +250 ml
            </Button>
            <Button variant="secondary" onClick={() => setWaterIntake(waterIntake + 500)}>
              +500 ml
            </Button>
            <Button variant="danger" onClick={() => setWaterIntake(0)}>
              Reset
            </Button>
          </div>
          <div className="water-reminder">
            <Form.Check
              type="switch"
              id="reminder-switch"
              label="Enable Reminder"
              checked={reminder}
              onChange={(e) => setReminder(e.target.checked)}
            />
            {reminder && (
              <Form.Group controlId="reminderInterval">
                <Form.Label>Reminder Interval (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  value={reminderInterval}
                  onChange={(e) => setReminderInterval(e.target.value)}
                />
              </Form.Group>
            )}
          </div>
        </div>
      </motion.div>

      {/* Started Plans Section */}
      <div className="started-plans-section">
        <h3>Started Plans</h3>
        <Row className="g-4">
          {startedPlans.map((plan) => (
            <Col key={plan.id} md={6} lg={4}>
              <Card className="started-plan-card">
                <Card.Body>
                  <h5>{plan.name}</h5>
                  <p>{plan.description}</p>
                  <div className="diet-tags">
                    <span className="diet-type">{plan.type}</span>
                    <span className="target-goal">{plan.target}</span>
                  </div>
                  <Button variant="danger" size="sm" onClick={() => setStartedPlans(startedPlans.filter(p => p.id !== plan.id))}>
                    <FaTrash /> Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Meal Log Section */}
      <div className="meal-log-section">
        <h3>Meal Log</h3>
        <Row className="g-4">
          {mealLog.map((meal) => (
            <Col key={meal.id} md={6} lg={4}>
              <Card className="meal-log-card">
                <Card.Body>
                  <div className="meal-log-header">
                    <h5>{meal.name}</h5>
                    <Button variant="danger" size="sm" onClick={() => removeMeal(meal.id)}>
                      <FaTrash />
                    </Button>
                  </div>
                  <p>{meal.calories} kcal</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default DietPlansPage;