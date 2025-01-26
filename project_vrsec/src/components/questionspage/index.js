import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Button, Form, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  FaVenusMars,
  FaBirthdayCake,
  FaRunning,
  FaRulerVertical,
  FaWeight,
  FaHeartbeat,
  FaArrowRight,
  FaArrowLeft,
  FaMale,
  FaFemale,
  FaBed,
  FaWalking,
  FaBiking,
  FaCheck,
  FaFire,
  FaDumbbell,
  FaYinYang,
  FaSmile,
  FaBatteryFull,
  FaMoon,
  FaUserAstronaut,
  FaBullseye,
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function QuestionsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(18);
  const [activityLevel, setActivityLevel] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [medicalConditions, setMedicalConditions] = useState([]);
  const [heightUnit, setHeightUnit] = useState('cm');
  const [otherCondition, setOtherCondition] = useState('');
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const activityLevels = [
    { level: 'Lazy', description: 'Little to no exercise, sedentary lifestyle.' },
    { level: 'Active', description: 'Moderate exercise or sports 3-5 days a week.' },
    { level: 'Hyperactive', description: 'Intense exercise or sports 6-7 days a week.' },
    { level: 'Average', description: 'Light exercise or sports 1-3 days a week.' },
  ];

  const conditions = ['Diabetes', 'High BP', 'Low BP', 'Asthma', 'None'];

  const handleNext = async () => {
    const userId = Cookies.get('userID');
    if (step < 7) {
      setStep(step + 1);
    } else {
      setIsLoading(true);

      const userData = {
        userId,
        gender,
        age,
        activityLevel,
        height,
        weight,
        weightUnit,
        medicalConditions,
        selectedGoals,
        otherCondition,
      };

      try {
        const response = await axios.post('https://health-1-71qg.onrender.com/api/auth/health-data', userData);

        if (response.status === 201) {
          toast.success('Data saved successfully!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          setTimeout(() => {
            navigate('/dashboard', { state: userData });
          }, 3000);
        }
      } catch (error) {
        console.error('Error saving data:', error);
        toast.error('Failed to save data. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleConditionChange = (condition) => {
    if (medicalConditions.includes(condition)) {
      setMedicalConditions(medicalConditions.filter((c) => c !== condition));
    } else {
      setMedicalConditions([...medicalConditions, condition]);
    }
  };

  const handleGoalChange = (goal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const progress = (step / 7) * 100;

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '20px' }}>
      <Container className="mt-5">
        {!isLoading && (
          <div style={{ background: '#e9ecef', borderRadius: '10px', height: '10px', width: '100%', marginBottom: '20px', overflow: 'hidden' }}>
            <div style={{ background: '#007bff', width: `${progress}%`, height: '100%', borderRadius: '10px', transition: 'width 0.5s ease' }}></div>
          </div>
        )}

        {!isLoading ? (
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} transition={{ duration: 0.5 }}>
              <Row className="justify-content-center">
                <Col md={8} className="text-center">
                  <Card style={{ borderRadius: '15px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
                    <Card.Body>
                      {step === 1 && (
                        <>
                          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                            <Card style={{ width: '350px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
                              <Card.Body className="p-4">
                                <Form>
                                  <h4 className="text-center mb-4" style={{ color: 'black' }}>
                                    <FaVenusMars className="me-2" />
                                    Choose Your Gender
                                  </h4>
                                  <div className="d-flex justify-content-center gap-4">
                                    <Button
                                      variant={gender === 'Male' ? 'success' : 'outline-secondary'}
                                      className="d-flex flex-column align-items-center p-3"
                                      onClick={() => setGender('Male')}
                                      style={{
                                        width: '120px',
                                        height: '120px',
                                        border: gender === 'Male' ? '2px solid #28a745' : '2px solid #6c757d',
                                        boxShadow: gender === 'Male' ? '0 0 15px #28a745' : 'none',
                                        transition: 'box-shadow 0.3s ease, border 0.3s ease',
                                      }}
                                    >
                                      <FaMale size={30} className="mb-2" />
                                      <span>Male</span>
                                    </Button>
                                    <Button
                                      variant={gender === 'Female' ? 'success' : 'outline-secondary'}
                                      className="d-flex flex-column align-items-center p-3"
                                      onClick={() => setGender('Female')}
                                      style={{
                                        width: '120px',
                                        height: '120px',
                                        border: gender === 'Female' ? '2px solid #e83e8c' : '2px solid #6c757d',
                                        boxShadow: gender === 'Female' ? '0 0 15px #e83e8c' : 'none',
                                        transition: 'box-shadow 0.3s ease, border 0.3s ease',
                                        color: gender === 'Female' ? '#e83e8c' : '#6c757d',
                                      }}
                                    >
                                      <FaFemale size={30} className="mb-2" />
                                      <span>Female</span>
                                    </Button>
                                  </div>
                                </Form>
                              </Card.Body>
                            </Card>
                          </div>
                        </>
                      )}

                      {step === 2 && (
                        <>
                          <h4 style={{ color: 'black' }}>
                            <FaBirthdayCake className="me-2" />
                            Select Your Age
                          </h4>
                          <Form.Range min={1} max={100} value={age} onChange={(e) => setAge(e.target.value)} />
                          <p style={{ color: 'black' }}>Selected Age: {age}</p>
                        </>
                      )}

                      {step === 3 && (
                        <>
                          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                            <Card style={{ width: '350px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
                              <Card.Body className="p-4">
                                <h4 className="text-center mb-4" style={{ color: 'black' }}>
                                  <FaRunning className="me-2" />
                                  Select Your Activity Level
                                </h4>
                                <Form>
                                  {activityLevels.map(({ level, description }) => (
                                    <motion.div
                                      key={level}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <Button
                                        variant={activityLevel === level ? 'success' : 'outline-secondary'}
                                        className="d-flex align-items-center justify-content-between w-100 mb-3 p-3"
                                        onClick={() => setActivityLevel(level)}
                                        style={{
                                          border: activityLevel === level ? '2px solid #28a745' : '2px solid #6c757d',
                                          borderRadius: '10px',
                                          color: activityLevel === level ? '#fff' : '#333',
                                          backgroundColor: activityLevel === level ? '#28a745' : 'transparent',
                                          transition: 'all 0.3s ease',
                                        }}
                                      >
                                        <div className="d-flex align-items-center">
                                          {level === 'Lazy' && <FaBed size={20} className="me-3" />}
                                          {level === 'Active' && <FaWalking size={20} className="me-3" />}
                                          {level === 'Hyperactive' && <FaRunning size={20} className="me-3" />}
                                          {level === 'Average' && <FaBiking size={20} className="me-3" />}
                                          <div>
                                            <h5 className="mb-0" style={{ color: activityLevel === level ? '#fff' : '#333' }}>{level}</h5>
                                            <small className="text-muted">{description}</small>
                                          </div>
                                        </div>
                                        {activityLevel === level && <FaCheck size={20} />}
                                      </Button>
                                    </motion.div>
                                  ))}
                                </Form>
                              </Card.Body>
                            </Card>
                          </div>
                        </>
                      )}

                      {step === 4 && (
                        <>
                          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                            <Card style={{ width: '350px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
                              <Card.Body className="p-4">
                                <h4 className="text-center mb-4" style={{ color: 'black' }}>
                                  <FaRulerVertical className="me-2" />
                                  Enter Your Height
                                </h4>
                                <Form>
                                  <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'black' }}><strong>Height</strong></Form.Label>
                                    <div className="d-flex align-items-center">
                                      <Form.Control
                                        type="number"
                                        placeholder="Enter height"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                        className="me-2"
                                      />
                                      <Form.Select
                                        value={heightUnit}
                                        onChange={(e) => setHeightUnit(e.target.value)}
                                        style={{ width: '120px' }}
                                      >
                                        <option value="cm">cm</option>
                                        <option value="inches">inches</option>
                                        <option value="feet">feet</option>
                                      </Form.Select>
                                    </div>
                                  </Form.Group>

                                  {height && (
                                    <div className="mt-3">
                                      <p className="mb-1" style={{ color: 'black' }}><strong>Converted Height:</strong></p>
                                      <ul className="list-unstyled">
                                        <li style={{ color: 'black' }}>{height} {heightUnit} is:</li>
                                        {heightUnit === 'cm' && (
                                          <>
                                            <li style={{ color: 'black' }}>{(height / 2.54).toFixed(2)} inches</li>
                                            <li style={{ color: 'black' }}>{(height / 30.48).toFixed(2)} feet</li>
                                          </>
                                        )}
                                        {heightUnit === 'inches' && (
                                          <>
                                            <li style={{ color: 'black' }}>{(height * 2.54).toFixed(2)} cm</li>
                                            <li style={{ color: 'black' }}>{(height / 12).toFixed(2)} feet</li>
                                          </>
                                        )}
                                        {heightUnit === 'feet' && (
                                          <>
                                            <li style={{ color: 'black' }}>{(height * 30.48).toFixed(2)} cm</li>
                                            <li style={{ color: 'black' }}>{(height * 12).toFixed(2)} inches</li>
                                          </>
                                        )}
                                      </ul>
                                    </div>
                                  )}
                                </Form>
                              </Card.Body>
                            </Card>
                          </div>
                        </>
                      )}

                      {step === 5 && (
                        <>
                          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                            <Card style={{ width: '350px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
                              <Card.Body className="p-4">
                                <h4 className="text-center mb-4" style={{ color: 'black' }}>
                                  <FaWeight className="me-2" />
                                  Enter Your Weight
                                </h4>
                                <Form>
                                  <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'black' }}><strong>Weight</strong></Form.Label>
                                    <Form.Control
                                      type="number"
                                      placeholder="Enter weight"
                                      value={weight}
                                      onChange={(e) => setWeight(e.target.value)}
                                      className="mb-3"
                                    />
                                  </Form.Group>

                                  <div className="d-flex justify-content-center gap-3 mb-4">
                                    <Button
                                      variant={weightUnit === 'kg' ? 'success' : 'outline-secondary'}
                                      className="d-flex align-items-center p-3"
                                      onClick={() => setWeightUnit('kg')}
                                      style={{
                                        border: weightUnit === 'kg' ? '2px solid #28a745' : '2px solid #6c757d',
                                        borderRadius: '10px',
                                        color: weightUnit === 'kg' ? '#fff' : '#333',
                                        backgroundColor: weightUnit === 'kg' ? '#28a745' : 'transparent',
                                        transition: 'all 0.3s ease',
                                      }}
                                    >
                                      <FaWeight className="me-2" />
                                      <span>kg</span>
                                    </Button>
                                    <Button
                                      variant={weightUnit === 'lbs' ? 'success' : 'outline-secondary'}
                                      className="d-flex align-items-center p-3"
                                      onClick={() => setWeightUnit('lbs')}
                                      style={{
                                        border: weightUnit === 'lbs' ? '2px solid #28a745' : '2px solid #6c757d',
                                        borderRadius: '10px',
                                        color: weightUnit === 'lbs' ? '#fff' : '#333',
                                        backgroundColor: weightUnit === 'lbs' ? '#28a745' : 'transparent',
                                        transition: 'all 0.3s ease',
                                      }}
                                    >
                                      <FaWeight className="me-2" />
                                      <span>lbs</span>
                                    </Button>
                                  </div>

                                  {weight && (
                                    <div className="mt-3">
                                      <p className="mb-1" style={{ color: 'black' }}><strong>Converted Weight:</strong></p>
                                      <ul className="list-unstyled">
                                        <li style={{ color: 'black' }}>{weight} {weightUnit} is:</li>
                                        {weightUnit === 'kg' && (
                                          <li style={{ color: 'black' }}>{(weight * 2.20462).toFixed(2)} lbs</li>
                                        )}
                                        {weightUnit === 'lbs' && (
                                          <li style={{ color: 'black' }}>{(weight / 2.20462).toFixed(2)} kg</li>
                                        )}
                                      </ul>
                                    </div>
                                  )}
                                </Form>
                              </Card.Body>
                            </Card>
                          </div>
                        </>
                      )}

                      {step === 6 && (
                        <>
                          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                            <Card style={{ width: '350px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
                              <Card.Body className="p-4">
                                <h4 className="text-center mb-4" style={{ color: 'black' }}>
                                  <FaHeartbeat className="me-2" />
                                  Select Your Medical Conditions
                                </h4>
                                <Form>
                                  {conditions.map((condition) => (
                                    <motion.div
                                      key={condition}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <Button
                                        variant={medicalConditions.includes(condition) ? 'success' : 'outline-secondary'}
                                        className="d-flex align-items-center justify-content-between w-100 mb-3 p-3"
                                        onClick={() => handleConditionChange(condition)}
                                        style={{
                                          border: medicalConditions.includes(condition) ? '2px solid #28a745' : '2px solid #6c757d',
                                          borderRadius: '10px',
                                          color: medicalConditions.includes(condition) ? '#fff' : '#333',
                                          backgroundColor: medicalConditions.includes(condition) ? '#28a745' : 'transparent',
                                          transition: 'all 0.3s ease',
                                        }}
                                      >
                                        <div className="d-flex align-items-center">
                                          <div
                                            style={{
                                              width: '20px',
                                              height: '20px',
                                              borderRadius: '50%',
                                              border: '2px solid #6c757d',
                                              backgroundColor: medicalConditions.includes(condition) ? '#28a745' : 'transparent',
                                              marginRight: '10px',
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                            }}
                                          >
                                            {medicalConditions.includes(condition) && (
                                              <FaCheck size={12} color="#fff" />
                                            )}
                                          </div>
                                          <span style={{ color: medicalConditions.includes(condition) ? '#fff' : '#333' }}>{condition}</span>
                                        </div>
                                      </Button>
                                    </motion.div>
                                  ))}

                                  <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <Form.Group className="mb-3">
                                      <Form.Label style={{ color: 'black' }}><strong>Others</strong></Form.Label>
                                      <Form.Control
                                        as="textarea"
                                        rows={2}
                                        placeholder="Specify other medical conditions"
                                        value={otherCondition}
                                        onChange={(e) => setOtherCondition(e.target.value)}
                                        className="mb-3"
                                      />
                                    </Form.Group>
                                  </motion.div>
                                </Form>
                              </Card.Body>
                            </Card>
                          </div>
                        </>
                      )}

                      {step === 7 && (
                        <>
                          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                            <Card style={{ width: '350px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
                              <Card.Body className="p-4">
                                <h4 className="text-center mb-4" style={{ color: 'black' }}>
                                  <FaBullseye className="me-2" />
                                  Select Your Fitness Goals
                                </h4>
                                <Form>
                                  {[
                                    { goal: 'Weight Loss', icon: <FaFire size={20} />, activities: 'Cardio, HIIT, calorie-controlled diets' },
                                    { goal: 'Muscle Building', icon: <FaDumbbell size={20} />, activities: 'Weightlifting, protein-rich diets, progressive overload' },
                                    { goal: 'Cardiovascular Health', icon: <FaHeartbeat size={20} />, activities: 'Running, swimming, cycling' },
                                    { goal: 'Flexibility and Mobility', icon: <FaYinYang size={20} />, activities: 'Yoga, stretching, Pilates' },
                                    { goal: 'Mental Health', icon: <FaSmile size={20} />, activities: 'Meditation, yoga, light exercises' },
                                    { goal: 'General Fitness', icon: <FaRunning size={20} />, activities: 'Regular workouts, balanced diet' },
                                    { goal: 'Increasing Energy Levels', icon: <FaBatteryFull size={20} />, activities: 'Regular exercise, balanced diet' },
                                    { goal: 'Improving Sleep Quality', icon: <FaMoon size={20} />, activities: 'Relaxation exercises, regular physical activity' },
                                    { goal: 'Self-Confidence', icon: <FaUserAstronaut size={20} />, activities: 'Regular exercise, strength training' },
                                  ].map(({ goal, icon, activities }) => (
                                    <motion.div
                                      key={goal}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <Button
                                        variant={selectedGoals.includes(goal) ? 'success' : 'outline-secondary'}
                                        className="d-flex align-items-center justify-content-between w-100 mb-3 p-3"
                                        onClick={() => handleGoalChange(goal)}
                                        style={{
                                          border: selectedGoals.includes(goal) ? '2px solid #28a745' : '2px solid #6c757d',
                                          borderRadius: '10px',
                                          color: selectedGoals.includes(goal) ? '#fff' : '#333',
                                          backgroundColor: selectedGoals.includes(goal) ? '#28a745' : 'transparent',
                                          transition: 'all 0.3s ease',
                                        }}
                                      >
                                        <div className="d-flex align-items-center">
                                          <div className="me-3">
                                            {icon}
                                          </div>
                                          <div>
                                            <h5 className="mb-0" style={{ color: selectedGoals.includes(goal) ? '#fff' : '#333' }}>{goal}</h5>
                                            <small className="text-muted">{activities}</small>
                                          </div>
                                        </div>
                                        {selectedGoals.includes(goal) && (
                                          <FaCheck size={20} className="ms-2" />
                                        )}
                                      </Button>
                                    </motion.div>
                                  ))}
                                </Form>
                              </Card.Body>
                            </Card>
                          </div>
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </motion.div>
          </AnimatePresence>
        ) : (
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <Card style={{ borderRadius: '15px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
                <Card.Body>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h4 className="mb-4" style={{ color: 'black' }}>Setting up your goals...</h4>
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </motion.div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {!isLoading && (
          <Row className="justify-content-center mt-4">
            <Col md={8} className="d-flex justify-content-between">
              {step > 1 && (
                <Button variant="secondary" onClick={handleBack}>
                  <FaArrowLeft className="me-2" />Back
                </Button>
              )}
              {step < 7 && (
                <Button variant="primary" onClick={handleNext}>
                  Next<FaArrowRight className="ms-2" />
                </Button>
              )}
              {step === 7 && (
                <Button variant="success" onClick={handleNext}>
                  Finish<FaCheck className="ms-2" />
                </Button>
              )}
            </Col>
          </Row>
        )}
      </Container>
      <ToastContainer />
    </div>
  );
}

export default QuestionsPage;
