import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  Person,
  Email,
  Female,
  Male,
  Cake,
  FitnessCenter,
  Height,
  MonitorWeight,
  MedicalServices,
  Flag,
} from "@mui/icons-material";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Generate random data for charts and usage time
  const generateRandomData = () => {
    const randomSteps = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10000) + 1000);
    const randomProgress = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1);
    const randomUsage = Array.from({ length: 4 }, () => Math.floor(Math.random() * 100) + 1);
    const randomUsageTime = Math.floor(Math.random() * 120) + 1; // Random usage time in minutes

    return {
      stepsData: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Steps",
            data: randomSteps,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      progressData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Progress",
            data: randomProgress,
            borderColor: "rgba(153, 102, 255, 1)",
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            fill: true,
          },
        ],
      },
      usageData: {
        labels: ["Sleep", "Work", "Exercise", "Leisure"],
        datasets: [
          {
            label: "Usage",
            data: randomUsage,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      usageTime: randomUsageTime,
    };
  };

  const [chartsData, setChartsData] = useState(generateRandomData());

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Fetch all users
        const userResponse = await axios.get(http://localhost:5000/api/auth/users);
        const userData = userResponse.data.find((u) => u._id === userId);

        if (!userData) {
          throw new Error("User not found");
        }

        // Fetch health data using GET with query parameters
        const healthResponse = await axios.get(http://localhost:5000/api/auth/health-getdata, {
          params: { userId }, // Pass userId as a query parameter
        });

        if (!healthResponse.data.userHealth) {
          throw new Error("Health data not found");
        }

        // Set user and health data in state
        setUser(userData);
        setHealthData(healthResponse.data.userHealth);
        setChartsData(generateRandomData()); // Generate new random data for each user
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ marginTop: 4 }}>
        {error}
      </Typography>
    );
  }

  if (!user || !healthData) {
    return (
      <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>
        No data found for this user.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* User Details Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              color: "#ffffff",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <Person sx={{ verticalAlign: "middle", marginRight: 1 }} />
                User Details
              </Typography>
              <Typography variant="body1">
                <Email sx={{ verticalAlign: "middle", marginRight: 1 }} />
                Email: {user.email}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Health Data Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: "linear-gradient(45deg, #FF9800 30%, #FFC107 90%)",
              color: "#ffffff",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <MedicalServices sx={{ verticalAlign: "middle", marginRight: 1 }} />
                Health Data
              </Typography>
              <Typography variant="body1">
                {healthData.gender === "Female" ? (
                  <Female sx={{ verticalAlign: "middle", marginRight: 1 }} />
                ) : (
                  <Male sx={{ verticalAlign: "middle", marginRight: 1 }} />
                )}
                Gender: {healthData.gender}
              </Typography>
              <Typography variant="body1">
                <Cake sx={{ verticalAlign: "middle", marginRight: 1 }} />
                Age: {healthData.age}
              </Typography>
              <Typography variant="body1">
                <FitnessCenter sx={{ verticalAlign: "middle", marginRight: 1 }} />
                Activity Level: {healthData.activityLevel}
              </Typography>
              <Typography variant="body1">
                <Height sx={{ verticalAlign: "middle", marginRight: 1 }} />
                Height: {healthData.Height}
              </Typography>
              <Typography variant="body1">
                <MonitorWeight sx={{ verticalAlign: "middle", marginRight: 1 }} />
                Weight: {healthData.weight}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Medical Conditions Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: "linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)",
              color: "#ffffff",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <MedicalServices sx={{ verticalAlign: "middle", marginRight: 1 }} />
                Medical Conditions
              </Typography>
              {healthData.medicalConditions.length > 0 ? (
                <List>
                  {healthData.medicalConditions.map((condition, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={condition} sx={{ color: "#ffffff" }} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>No medical conditions recorded.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Selected Goals Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: "linear-gradient(45deg, #9C27B0 30%, #E91E63 90%)",
              color: "#ffffff",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <Flag sx={{ verticalAlign: "middle", marginRight: 1 }} />
                Selected Goals
              </Typography>
              {healthData.selectedGoals.length > 0 ? (
                <List>
                  {healthData.selectedGoals.map((goal, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={goal} sx={{ color: "#ffffff" }} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>No goals selected.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Customer Usage Time Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: "linear-gradient(45deg, #FF6F61 30%, #FFA07A 90%)",
              color: "#ffffff",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                App Usage Time
              </Typography>
              <Typography variant="body1">
                Total Usage Time: {chartsData.usageTime} minutes
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Charts Section */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
            Activity and Usage
          </Typography>
          <Grid container spacing={3}>
            {/* Steps Chart */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Daily Steps
                  </Typography>
                  <Bar data={chartsData.stepsData} />
                </CardContent>
              </Card>
            </Grid>

            {/* Progress Chart */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Monthly Progress
                  </Typography>
                  <Line data={chartsData.progressData} />
                </CardContent>
              </Card>
            </Grid>

            {/* Usage Chart */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Usage Breakdown
                  </Typography>
                  <Pie data={chartsData.usageData} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDetails;