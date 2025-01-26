import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Container, Row, Col, Button, Spinner, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // Custom CSS for animations and styling

const Suggestion = () => {
  const [healthData, setHealthData] = useState({
    age: "",
    gender: "",
    activityLevel: "",
    height: "",
    weight: "",
    medicalConditions: [],
    selectedGoals: [],
  });
  const [airesponse, setAIResponse] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for generating plans
  const [userId, setUserId] = useState(""); // Store userId from cookies

  // Fetch userId from cookies on component mount
  useEffect(() => {
    const userIdFromCookie = Cookies.get("userID");
    if (userIdFromCookie) {
      setUserId(userIdFromCookie);
      fetchHealthData(userIdFromCookie); // Fetch health data from backend
    }
  }, []);

  // Fetch health data from the backend
  const fetchHealthData = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.post("https://health-1-71qg.onrender.com/api/auth/health-getdata", { userId });
      const userHealth = response.data.userHealth;
      console.log("Fetched Health Data:", userHealth);

      // Set health data
      setHealthData({
        age: userHealth.age || "",
        gender: userHealth.gender || "",
        activityLevel: userHealth.activityLevel || "",
        height: userHealth.height || "",
        weight: userHealth.weight || "",
        medicalConditions: userHealth.medicalConditions || [],
        selectedGoals: userHealth.selectedGoals || [],
      });
    } catch (error) {
      console.error("Error fetching health data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Generate personalized plans using Google Gemini API
  const handleGeneratePlans = async () => {
    setLoading(true);
    try {
      // Construct the prompt with a specific format
      const prompt = `Generate a detailed and personalized health plan for a ${healthData.age}-year-old ${healthData.gender} with a ${healthData.activityLevel} activity level, ${healthData.height} tall, ${healthData.weight} weight, medical conditions: ${healthData.medicalConditions.join(", ")}, and goals: ${healthData.selectedGoals.join(", ")}. 

      Provide the response in the following exact format:

      **Workout Plan:**
      - Provide a detailed workout plan including exercises, sets, reps, and rest periods. Specify the duration and intensity of each workout session.
      - Include a variety of exercises targeting different muscle groups.
      - Mention any equipment needed and provide alternatives if necessary.

      **Diet Plan:**
      - Provide a detailed diet plan including meals for breakfast, lunch, dinner, and snacks.
      - Specify portion sizes and macronutrient breakdown (carbs, proteins, fats).
      - Include any dietary restrictions or recommendations based on medical conditions.
      - Suggest hydration guidelines and any supplements if needed.

      **Weekly Schedule:**
      - Provide a detailed weekly schedule integrating workout and diet plans.
      - Specify the timing of meals and workout sessions.
      - Include rest days and active recovery activities.
      - Mention any adjustments based on the user's activity level and goals.

      **Expected Results:**
      - Provide a detailed description of the expected results over time.
      - Include milestones and timelines for achieving specific goals.
      - Mention any potential challenges and how to overcome them.
      - Provide tips for maintaining motivation and tracking progress.

      Ensure the response is clear, descriptive, and easy to follow. Do not include any additional text or explanations.`;

      console.log("Prompt:", prompt); // Log the prompt

      // Call Google Gemini API
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCfg9ozC7TpdpNHh50QdO0HteWRu_uTUSQ`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }
      );

      console.log("API Response:", response.data); // Log the full response

      // Extract the AI response
      const aiResponse = response.data.candidates[0].content.parts[0].text;
      console.log("AI Response:", aiResponse);

      // Remove stars from the response
      const cleanedResponse = aiResponse.replace(/\*\*/g, "").replace(/\*/g, "");

      // Set the cleaned response
      setAIResponse(cleanedResponse);
    } catch (error) {
      console.error("Error generating plans:", error);
      console.error("Error details:", error.response?.data || error.message); // Log detailed error
      alert("Failed to generate plans. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to parse the AI response into sections
  const parseResponse = (response) => {
    const sections = {
      workoutPlan: "",
      dietPlan: "",
      weeklySchedule: "",
      expectedResults: "",
    };

    // Use regex to extract sections dynamically
    const workoutPlanMatch = response.match(/Workout Plan:([\s\S]*?)(Diet Plan:|Weekly Schedule:|Expected Results:|$)/i);
    const dietPlanMatch = response.match(/Diet Plan:([\s\S]*?)(Weekly Schedule:|Expected Results:|$)/i);
    const weeklyScheduleMatch = response.match(/Weekly Schedule:([\s\S]*?)(Expected Results:|$)/i);
    const expectedResultsMatch = response.match(/Expected Results:([\s\S]*?)$/i);

    // Update sections with extracted data
    if (workoutPlanMatch) sections.workoutPlan = workoutPlanMatch[1].trim();
    if (dietPlanMatch) sections.dietPlan = dietPlanMatch[1].trim();
    if (weeklyScheduleMatch) sections.weeklySchedule = weeklyScheduleMatch[1].trim();
    if (expectedResultsMatch) sections.expectedResults = expectedResultsMatch[1].trim();

    return sections;
  };

  // Parse the AI response into sections
  const parsedResponse = parseResponse(airesponse);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4" style={{ color: "#4A90E2" }}>
        Personalized Health Plans
      </h1>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" style={{ color: "#50E3C2" }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {/* Button to Generate Plans */}
          <Row className="mb-4">
            <Col className="text-center">
              <Button
                onClick={handleGeneratePlans}
                disabled={loading}
                className="btn-primary"
                style={{ backgroundColor: "#50E3C2", border: "none" }}
              >
                {loading ? "Generating..." : "Generate Plans"}
              </Button>
            </Col>
          </Row>

          {/* Display AI Response in Cards */}
          {airesponse && (
            <Row className="mt-4">
              {/* Workout Plan Card */}
              {parsedResponse.workoutPlan && (
                <Col md={6} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title className="text-center" style={{ color: "#4A90E2" }}>
                        Workout Plan
                      </Card.Title>
                      <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", fontSize: "16px" }}>
                        {parsedResponse.workoutPlan}
                      </pre>
                    </Card.Body>
                  </Card>
                </Col>
              )}

              {/* Diet Plan Card */}
              {parsedResponse.dietPlan && (
                <Col md={6} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title className="text-center" style={{ color: "#4A90E2" }}>
                        Diet Plan
                      </Card.Title>
                      <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", fontSize: "16px" }}>
                        {parsedResponse.dietPlan}
                      </pre>
                    </Card.Body>
                  </Card>
                </Col>
              )}

              {/* Weekly Schedule Card */}
              {parsedResponse.weeklySchedule && (
                <Col md={6} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title className="text-center" style={{ color: "#4A90E2" }}>
                        Weekly Schedule
                      </Card.Title>
                      <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", fontSize: "16px" }}>
                        {parsedResponse.weeklySchedule}
                      </pre>
                    </Card.Body>
                  </Card>
                </Col>
              )}

              {/* Expected Results Card */}
              {parsedResponse.expectedResults && (
                <Col md={6} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title className="text-center" style={{ color: "#4A90E2" }}>
                        Expected Results
                      </Card.Title>
                      <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", fontSize: "16px" }}>
                        {parsedResponse.expectedResults}
                      </pre>
                    </Card.Body>
                  </Card>
                </Col>
              )}
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default Suggestion;
