import React, { useState, useEffect } from 'react';
import { FaFilter, FaFire, FaClock, FaDumbbell, FaPlay, FaStop, FaUser, FaShare, FaBell, FaMoon, FaSun, FaCheck } from 'react-icons/fa';
import { Container, Row, Col, Card, Button, Form, Modal, ProgressBar } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import workoutData from '../workouts/work.json'; // Import the JSON data
import './index.css';

const WorkoutsPage = () => {
  // State Management
  const [workouts, setWorkouts] = useState(workoutData.workouts);
  const [filters, setFilters] = useState({ difficulty: '', targetMuscles: '', duration: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);
  const [userProfile, setUserProfile] = useState({ name: '', age: '', weight: '', height: '', fitnessGoal: '' });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [reminder, setReminder] = useState('');
  const [customWorkout, setCustomWorkout] = useState({ name: '', description: '', time: '', caloriesBurned: '', difficulty: '', targetMuscles: [] });
  const [showCustomWorkoutModal, setShowCustomWorkoutModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [challenges, setChallenges] = useState([
    { id: 1, name: '30-Day Plank Challenge', description: 'Complete a plank every day for 30 days.', completed: false },
    { id: 2, name: '100 Pushups Challenge', description: 'Complete 100 pushups in a single session.', completed: false },
    { id: 3, name: '5K Run Challenge', description: 'Run 5 kilometers in under 30 minutes.', completed: false },
  ]);
  const [communityPosts, setCommunityPosts] = useState([
    { id: 1, user: 'User1', content: 'Just completed my first 5K run! Feeling great!' },
    { id: 2, user: 'User2', content: 'Anyone up for a 30-day plank challenge?' },
    { id: 3, user: 'User3', content: 'Tips for improving pushup form?' },
  ]);
  const [newPost, setNewPost] = useState('');

  // Handlers
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const filteredWorkouts = workoutData.workouts.filter((workout) => {
      return (
        (filters.difficulty === '' || workout.difficulty === filters.difficulty) &&
        (filters.targetMuscles === '' || workout.targetMuscles.includes(filters.targetMuscles)) &&
        (filters.duration === '' || workout.time === filters.duration)
      );
    });
    setWorkouts(filteredWorkouts);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({ difficulty: '', targetMuscles: '', duration: '' });
    setWorkouts(workoutData.workouts);
    setShowFilters(false);
  };

  const openWorkoutDetails = (workout) => {
    setSelectedWorkout(workout);
    setTimer(parseInt(workout.time, 10) * 60); // Convert minutes to seconds
    setIsTimerRunning(false);
  };

  const closeWorkoutDetails = () => {
    setSelectedWorkout(null);
    setIsTimerRunning(false);
  };

  const handleTimerToggle = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const saveProfile = () => {
    toast.success('Profile saved successfully!');
    setShowProfileModal(false);
  };

  const addWorkoutToHistory = (workout) => {
    setWorkoutHistory([...workoutHistory, { ...workout, date: new Date().toLocaleDateString() }]);
    toast.success(`🎉 ${workout.name} added to history!`);
  };

  const setWorkoutReminder = () => {
    toast.success(`Reminder set for ${reminder}`);
  };

  const handleCustomWorkoutChange = (e) => {
    const { name, value } = e.target;
    setCustomWorkout({ ...customWorkout, [name]: value });
  };

  const saveCustomWorkout = () => {
    toast.success('Custom workout saved successfully!');
    setShowCustomWorkoutModal(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const completeChallenge = (id) => {
    setChallenges(challenges.map(challenge => challenge.id === id ? { ...challenge, completed: true } : challenge));
    toast.success('Challenge completed!');
  };

  const addPost = () => {
    setCommunityPosts([...communityPosts, { id: communityPosts.length + 1, user: 'CurrentUser', content: newPost }]);
    setNewPost('');
    toast.success('Post added to community!');
  };

  // Timer Effect
  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      toast.success(`🎉 Workout completed! You burned ${selectedWorkout.caloriesBurned} kcal.`);
      setTotalCaloriesBurned((prevCalories) => prevCalories + selectedWorkout.caloriesBurned);
      addWorkoutToHistory(selectedWorkout);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, selectedWorkout]);

  return (
    <div className={`workouts-page ${darkMode ? 'dark-mode' : ''}`}>
      <ToastContainer />
      <div className="page-header">
        <h1>Workouts</h1>
        <p>Find the perfect workout plan for your fitness goals!</p>
        <div className="total-calories">
          <FaFire size={24} />
          <span>Total Calories Burned: {totalCaloriesBurned} kcal</span>
        </div>
        <Button variant="primary" onClick={() => setShowFilters(true)}>
          <FaFilter /> Filter Workouts
        </Button>
       
        
      </div>

      {/* Filter Modal */}
      <Modal show={showFilters} onHide={() => setShowFilters(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Filter Workouts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="difficulty">
              <Form.Label>Difficulty</Form.Label>
              <Form.Control as="select" name="difficulty" value={filters.difficulty} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="targetMuscles">
              <Form.Label>Target Muscles</Form.Label>
              <Form.Control as="select" name="targetMuscles" value={filters.targetMuscles} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="Chest">Chest</option>
                <option value="Shoulders">Shoulders</option>
                <option value="Triceps">Triceps</option>
                <option value="Quads">Quads</option>
                <option value="Hamstrings">Hamstrings</option>
                <option value="Glutes">Glutes</option>
                <option value="Core">Core</option>
                <option value="Back">Back</option>
                <option value="Full Body">Full Body</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="duration">
              <Form.Label>Duration</Form.Label>
              <Form.Control as="select" name="duration" value={filters.duration} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="5 mins">5 mins</option>
                <option value="10 mins">10 mins</option>
                <option value="15 mins">15 mins</option>
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

      {/* Workout Cards */}
      <Container>
        <Row className="g-4">
          {workouts.map((workout) => (
            <Col key={workout.id} md={6} lg={4}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="workout-card" onClick={() => openWorkoutDetails(workout)}>
                  <Card.Body>
                    <div className="workout-header">
                      <h3>{workout.name}</h3>
                      <div className="workout-details">
                        <div className="duration">
                          <FaClock size={20} />
                          <span>{workout.time}</span>
                        </div>
                        <div className="calories">
                          <FaFire size={20} />
                          <span>{workout.caloriesBurned} kcal</span>
                        </div>
                      </div>
                    </div>
                    <p>{workout.description}</p>
                    <div className="workout-tags">
                      <span className="difficulty">{workout.difficulty}</span>
                      <span className="target-muscles">{workout.targetMuscles.join(', ')}</span>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Workout Details Modal */}
      {selectedWorkout && (
        <Modal show={!!selectedWorkout} onHide={closeWorkoutDetails} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedWorkout.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="workout-instructions">
              <h4>Description:</h4>
              <p>{selectedWorkout.description}</p>
            </div>
            <div className="workout-variations">
              <h4>Variations:</h4>
              {selectedWorkout.variations.map((variation, index) => (
                <div key={index} className="variation">
                  <h5>{variation.name}</h5>
                  <p>{variation.description}</p>
                  <img src={variation.gif} alt={variation.name} className="variation-gif" />
                </div>
              ))}
            </div>
            <div className="timer-section">
              <h4>Timer:</h4>
              <div className="timer-display">
                <span>{Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</span>
              </div>
              <Button variant={isTimerRunning ? 'danger' : 'success'} onClick={handleTimerToggle}>
                {isTimerRunning ? <FaStop /> : <FaPlay />}
                {isTimerRunning ? ' Stop Timer' : ' Start Timer'}
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => addWorkoutToHistory(selectedWorkout)}>
              <FaCheck /> Mark as Completed
            </Button>
            <Button variant="secondary" onClick={closeWorkoutDetails}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Profile Modal */}
      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={userProfile.name} onChange={handleProfileChange} />
            </Form.Group>
            <Form.Group controlId="age">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" name="age" value={userProfile.age} onChange={handleProfileChange} />
            </Form.Group>
            <Form.Group controlId="weight">
              <Form.Label>Weight (kg)</Form.Label>
              <Form.Control type="number" name="weight" value={userProfile.weight} onChange={handleProfileChange} />
            </Form.Group>
            <Form.Group controlId="height">
              <Form.Label>Height (cm)</Form.Label>
              <Form.Control type="number" name="height" value={userProfile.height} onChange={handleProfileChange} />
            </Form.Group>
            <Form.Group controlId="fitnessGoal">
              <Form.Label>Fitness Goal</Form.Label>
              <Form.Control as="select" name="fitnessGoal" value={userProfile.fitnessGoal} onChange={handleProfileChange}>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Muscle Gain">Muscle Gain</option>
                <option value="Endurance">Endurance</option>
                <option value="Flexibility">Flexibility</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProfileModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={saveProfile}>
            Save Profile
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Workout History */}
      <div className="workout-history">
        <h3>Workout History</h3>
        {workoutHistory.map((workout, index) => (
          <div key={index} className="workout-history-item">
            <span>{workout.date}</span>
            <span>{workout.name}</span>
            <span>{workout.caloriesBurned} kcal</span>
          </div>
        ))}
      </div>

      {/* Reminder Section */}
      <div className="reminder-section">
        <h3>Set Workout Reminder</h3>
        <Form>
          <Form.Group controlId="reminder">
            <Form.Control type="time" name="reminder" value={reminder} onChange={(e) => setReminder(e.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={setWorkoutReminder}>
            <FaBell /> Set Reminder
          </Button>
        </Form>
      </div>

      {/* Custom Workout Modal */}
      <Modal show={showCustomWorkoutModal} onHide={() => setShowCustomWorkoutModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Custom Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Workout Name</Form.Label>
              <Form.Control type="text" name="name" value={customWorkout.name} onChange={handleCustomWorkoutChange} />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={customWorkout.description} onChange={handleCustomWorkoutChange} />
            </Form.Group>
            <Form.Group controlId="time">
              <Form.Label>Duration</Form.Label>
              <Form.Control type="text" name="time" value={customWorkout.time} onChange={handleCustomWorkoutChange} />
            </Form.Group>
            <Form.Group controlId="caloriesBurned">
              <Form.Label>Calories Burned</Form.Label>
              <Form.Control type="number" name="caloriesBurned" value={customWorkout.caloriesBurned} onChange={handleCustomWorkoutChange} />
            </Form.Group>
            <Form.Group controlId="difficulty">
              <Form.Label>Difficulty</Form.Label>
              <Form.Control as="select" name="difficulty" value={customWorkout.difficulty} onChange={handleCustomWorkoutChange}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="targetMuscles">
              <Form.Label>Target Muscles</Form.Label>
              <Form.Control as="select" multiple name="targetMuscles" value={customWorkout.targetMuscles} onChange={(e) => setCustomWorkout({ ...customWorkout, targetMuscles: Array.from(e.target.selectedOptions, (item) => item.value) })}>
                <option value="Chest">Chest</option>
                <option value="Shoulders">Shoulders</option>
                <option value="Triceps">Triceps</option>
                <option value="Quads">Quads</option>
                <option value="Hamstrings">Hamstrings</option>
                <option value="Glutes">Glutes</option>
                <option value="Core">Core</option>
                <option value="Back">Back</option>
                <option value="Full Body">Full Body</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCustomWorkoutModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={saveCustomWorkout}>
            Save Custom Workout
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Challenges Section */}
      <div className="challenges-section">
        <h3>Workout Challenges</h3>
        {challenges.map((challenge) => (
          <div key={challenge.id} className="challenge-card">
            <h4>{challenge.name}</h4>
            <p>{challenge.description}</p>
            <Button variant={challenge.completed ? 'success' : 'primary'} onClick={() => completeChallenge(challenge.id)} disabled={challenge.completed}>
              {challenge.completed ? 'Completed' : 'Start Challenge'}
            </Button>
          </div>
        ))}
      </div>

      {/* Community Section */}
      <div className="community-section">
        <h3>Community</h3>
        <Form>
          <Form.Group controlId="newPost">
            <Form.Control as="textarea" rows={3} value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder="Share your thoughts..." />
          </Form.Group>
          <Button variant="primary" onClick={addPost}>
            Post
          </Button>
        </Form>
        <div className="community-posts">
          {communityPosts.map((post) => (
            <div key={post.id} className="community-post">
              <strong>{post.user}</strong>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tutorial Modal */}
      <Modal show={showTutorial} onHide={() => setShowTutorial(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Interactive Tutorial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Welcome to the Workouts Page! Here's a quick guide to get you started:</p>
          <ul>
            <li>Use the filter button to find workouts based on difficulty, target muscles, and duration.</li>
            <li>Click on a workout card to view details and start a timer.</li>
            <li>Track your progress and set reminders to stay on track.</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowTutorial(false)}>
            Got it!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WorkoutsPage;