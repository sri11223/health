import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Container, Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './index.css'; // Import custom CSS for hover effects

const ProgressPage = () => {
  const [view, setView] = useState('weekly'); // State to manage the current view

  // Sample data for weekly progress
  const weeklyData = [
    { day: 'Mon', calories: 1800, steps: 5000, sleep: 7.5 },
    { day: 'Tue', calories: 2200, steps: 6000, sleep: 8.0 },
    { day: 'Wed', calories: 2000, steps: 5500, sleep: 7.0 },
    { day: 'Thu', calories: 2400, steps: 7000, sleep: 7.8 },
    { day: 'Fri', calories: 1900, steps: 4500, sleep: 6.5 },
    { day: 'Sat', calories: 2100, steps: 8000, sleep: 8.5 },
    { day: 'Sun', calories: 2300, steps: 7500, sleep: 7.2 },
  ];

  // Sample data for monthly progress
  const monthlyData = [
    { week: 'Week 1', calories: 8500, steps: 30000, sleep: 52.5 },
    { week: 'Week 2', calories: 9000, steps: 35000, sleep: 56.0 },
    { week: 'Week 3', calories: 8800, steps: 32000, sleep: 53.0 },
    { week: 'Week 4', calories: 9200, steps: 40000, sleep: 58.0 },
  ];

  // Sample data for yearly progress
  const yearlyData = [
    { month: 'Jan', calories: 35000, steps: 150000, sleep: 240 },
    { month: 'Feb', calories: 34000, steps: 140000, sleep: 230 },
    { month: 'Mar', calories: 36000, steps: 160000, sleep: 250 },
    { month: 'Apr', calories: 35500, steps: 155000, sleep: 245 },
    { month: 'May', calories: 37000, steps: 165000, sleep: 260 },
    { month: 'Jun', calories: 36500, steps: 160000, sleep: 255 },
    { month: 'Jul', calories: 38000, steps: 170000, sleep: 270 },
    { month: 'Aug', calories: 37500, steps: 165000, sleep: 265 },
    { month: 'Sep', calories: 39000, steps: 180000, sleep: 280 },
    { month: 'Oct', calories: 38500, steps: 175000, sleep: 275 },
    { month: 'Nov', calories: 40000, steps: 190000, sleep: 290 },
    { month: 'Dec', calories: 39500, steps: 185000, sleep: 285 },
  ];

  // Colors for the charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  // Additional metrics
  const totalCaloriesConsumed = weeklyData.reduce((sum, day) => sum + day.calories, 0);
  const averageDailyIntake = (totalCaloriesConsumed / weeklyData.length).toFixed(2);
  const totalSteps = weeklyData.reduce((sum, day) => sum + day.steps, 0);
  const averageSleep = (weeklyData.reduce((sum, day) => sum + day.sleep, 0) / weeklyData.length).toFixed(2);

  return (
    <Container className="progress-page my-4">
      <h1 className="text-center mb-4">Your Progress</h1>

      {/* Additional Metrics */}
      <Row className="mb-4">
        <Col md={3}>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Card className="text-center hover-card">
              <Card.Body>
                <Card.Title>Total Calories Consumed</Card.Title>
                <Card.Text className="display-4">{totalCaloriesConsumed} kcal</Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        <Col md={3}>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Card className="text-center hover-card">
              <Card.Body>
                <Card.Title>Average Daily Intake</Card.Title>
                <Card.Text className="display-4">{averageDailyIntake} kcal</Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        <Col md={3}>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Card className="text-center hover-card">
              <Card.Body>
                <Card.Title>Total Steps</Card.Title>
                <Card.Text className="display-4">{totalSteps}</Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        <Col md={3}>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Card className="text-center hover-card">
              <Card.Body>
                <Card.Title>Average Sleep</Card.Title>
                <Card.Text className="display-4">{averageSleep} hrs</Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Toggle Buttons */}
      <div className="text-center mb-4">
        <ButtonGroup>
          <Button
            variant={view === 'weekly' ? 'primary' : 'outline-primary'}
            onClick={() => setView('weekly')}
          >
            Weekly
          </Button>
          <Button
            variant={view === 'monthly' ? 'primary' : 'outline-primary'}
            onClick={() => setView('monthly')}
          >
            Monthly
          </Button>
          <Button
            variant={view === 'yearly' ? 'primary' : 'outline-primary'}
            onClick={() => setView('yearly')}
          >
            Yearly
          </Button>
        </ButtonGroup>
      </div>

      {/* Weekly Progress */}
      {view === 'weekly' && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="mb-4 hover-card">
              <Card.Body>
                <Card.Title>Weekly Calorie Intake</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="calories" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="mb-4 hover-card">
              <Card.Body>
                <Card.Title>Weekly Steps</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="steps" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="mb-4 hover-card">
              <Card.Body>
                <Card.Title>Weekly Sleep</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="sleep" stroke="#ffc658" fill="#ffc658" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="mb-4 hover-card">
              <Card.Body>
                <Card.Title>Weekly Calorie Distribution</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={weeklyData}
                      dataKey="calories"
                      nameKey="day"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {weeklyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </motion.div>
        </>
      )}

      {/* Monthly Progress */}
      {view === 'monthly' && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="mb-4 hover-card">
              <Card.Body>
                <Card.Title>Monthly Calorie Intake</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="calories" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="mb-4 hover-card">
              <Card.Body>
                <Card.Title>Monthly Steps</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="steps" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="mb-4 hover-card">
              <Card.Body>
                <Card.Title>Monthly Sleep</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="sleep" stroke="#ffc658" fill="#ffc658" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="mb-4 hover-card">
              <Card.Body>
                <Card.Title>Monthly Calorie Distribution</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={monthlyData}
                      dataKey="calories"
                      nameKey="week"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {monthlyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </motion.div>
        </>
      )}

      {/* Yearly Progress */}
      {view === 'yearly' && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="mb-4 hover-card">
              <Card.Body>
                <Card.Title>Yearly Calorie Intake</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="calories" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="mb-4 hover-card">
              <Card.Body>
                <Card.Title>Yearly Steps</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="steps" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="mb-4 hover-card">
              <Card.Body>
                <Card.Title>Yearly Sleep</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="sleep" stroke="#ffc658" fill="#ffc658" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="mb-4 hover-card">
              <Card.Body>
                <Card.Title>Yearly Calorie Distribution</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={yearlyData}
                      dataKey="calories"
                      nameKey="month"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {yearlyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </motion.div>
        </>
      )}
    </Container>
  );
};

export default ProgressPage;