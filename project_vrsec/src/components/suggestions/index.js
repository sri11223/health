import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Container, Row, Col, Card, Button, Modal, Spinner } from "react-bootstrap";
import { FaUser, FaHeartbeat, FaRulerVertical, FaWeight, FaStethoscope, FaBullseye } from "react-icons/fa"; // Icons
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // Custom CSS for animations and styling

const SuggestionForm = () => {
  const [healthData, setHealthData] = useState({
    age: "",
    gender: "",
    activityLevel: "",
    height: "", // Height as an object
    weight: "", // Weight as an object
    medicalConditions: [],
    selectedGoals: [],
  });
  const [suggestions, setSuggestions] = useState([]); // Store top 5 suggestions
  const [selectedSuggestion, setSelectedSuggestion] = useState(""); // Store the user's selected suggestion
  const [suggestionDetails, setSuggestionDetails] = useState(""); // Store detailed information about the selected suggestion
  const [loading, setLoading] = useState(false); // Loading state for generating suggestions
  const [detailsLoading, setDetailsLoading] = useState(false); // Loading state for fetching details
  const [showPopup, setShowPopup] = useState(false); // Popup visibility
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
      const response = await axios.post("http://localhost:5000/api/auth/health-getdata", { userId });
      const userHealth = response.data.userHealth;
      const height = userHealth.height;

      // Set health data
      setHealthData({
        age: userHealth.age || "",
        gender: userHealth.gender || "",
        activityLevel: userHealth.activityLevel || "",
        height: height,
        weight: userHealth.weight || { value: "", unit: "kg" }, // Ensure weight is an object
        medicalConditions: userHealth.medicalConditions || [],
        selectedGoals: userHealth.selectedGoals || [],
      });
    } catch (error) {
      console.error("Error fetching health data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Generate suggestions using Google Gemini API
  const handleGenerateSuggestions = async () => {
    setLoading(true);
    try {
      // Construct the prompt
      const prompt = `Give me 5 fitness suggestions for a ${healthData.age}-year-old ${healthData.gender} with a ${healthData.activityLevel} activity level, ${healthData.height.value} ${healthData.height.unit} tall, ${healthData.weight.value} ${healthData.weight.unit} weight, medical conditions: ${healthData.medicalConditions.join(", ")}, and goals: ${healthData.selectedGoals.join(", ")}.`;

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

      // Extract and format the AI response
      const aiResponse = response.data.candidates[0].content.parts[0].text;
      const suggestionsList = aiResponse
        .split("\n")
        .filter((line) => line.trim()) // Remove empty lines
        .slice(0, 5) // Limit to top 5 suggestions
        .map((line) => line.replace(/\*/g, "")); // Remove asterisks

      // Update state with suggestions
      setSuggestions(suggestionsList);
      setSelectedSuggestion(""); // Clear any previously selected suggestion
    } catch (error) {
      console.error("Error fetching suggestions:", error);

      // Handle specific errors
      if (error.response) {
        // API returned an error (e.g., 4xx or 5xx)
        alert(`API Error: ${error.response.data.error.message}`);
      } else if (error.request) {
        // No response received (e.g., network error)
        alert("Network Error: Please check your internet connection.");
      } else {
        // Other errors
        alert("An unexpected error occurred. Please try again.");
      }

      // Reset suggestions on error
      setSuggestions([]);
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  // Fetch detailed information about a selected suggestion
  const handleSelectSuggestion = async (suggestion) => {
    setDetailsLoading(true);
    setSelectedSuggestion(suggestion);
    setShowPopup(true); // Show popup when a suggestion is selected

    try {
      // Construct a prompt to get more details about the selected suggestion
      const prompt = `Provide detailed information about the following fitness suggestion: ${suggestion}. Include benefits, steps, precautions, and any other relevant details.`;

      // Call Google Gemini API for detailed information
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

      // Extract the detailed response
      const details = response.data.candidates[0].content.parts[0].text.replace(/\*/g, ""); // Remove asterisks
      setSuggestionDetails(details);
    } catch (error) {
      console.error("Error fetching suggestion details:", error);
      setSuggestionDetails("Failed to fetch details. Please try again.");
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide popup
    setSuggestionDetails(""); // Clear details when popup is closed
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4" style={{ color: "#4A90E2" }}>
        Your Health Data and Suggestions
      </h1>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" style={{ color: "#50E3C2" }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {/* Display Health Data */}
          <Row className="g-4 mb-4">
            {/* Age */}
            <Col md={6}>
              <Card className="h-100 shadow-sm health-card">
                <Card.Body>
                  <Card.Title>
                    <FaUser className="me-2" style={{ color: "#4A90E2" }} />
                    Age
                  </Card.Title>
                  <Card.Text>{healthData.age}</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Gender */}
            <Col md={6}>
              <Card className="h-100 shadow-sm health-card">
                <Card.Body>
                  <Card.Title>
                    <FaUser className="me-2" style={{ color: "#4A90E2" }} />
                    Gender
                  </Card.Title>
                  <Card.Text>{healthData.gender}</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Activity Level */}
            <Col md={6}>
              <Card className="h-100 shadow-sm health-card">
                <Card.Body>
                  <Card.Title>
                    <FaHeartbeat className="me-2" style={{ color: "#4A90E2" }} />
                    Activity Level
                  </Card.Title>
                  <Card.Text>{healthData.activityLevel}</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Height */}
            <Col md={6}>
              <Card className="h-100 shadow-sm health-card">
                <Card.Body>
                  <Card.Title>
                    <FaRulerVertical className="me-2" style={{ color: "#4A90E2" }} />
                    Height
                  </Card.Title>
                  <Card.Text>
                    {healthData.height}  {/* Render height with unit */}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Weight */}
            <Col md={6}>
              <Card className="h-100 shadow-sm health-card">
                <Card.Body>
                  <Card.Title>
                    <FaWeight className="me-2" style={{ color: "#4A90E2" }} />
                    Weight
                  </Card.Title>
                  <Card.Text>
                    {healthData.weight}{/* Render weight with unit */}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Medical Conditions */}
            <Col md={6}>
              <Card className="h-100 shadow-sm health-card">
                <Card.Body>
                  <Card.Title>
                    <FaStethoscope className="me-2" style={{ color: "#4A90E2" }} />
                    Medical Conditions
                  </Card.Title>
                  <Card.Text>
                    {healthData.medicalConditions.length > 0
                      ? healthData.medicalConditions.join(", ")
                      : "None"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Goals */}
            <Col md={6}>
              <Card className="h-100 shadow-sm health-card">
                <Card.Body>
                  <Card.Title>
                    <FaBullseye className="me-2" style={{ color: "#4A90E2" }} />
                    Goals
                  </Card.Title>
                  <Card.Text>
                    {healthData.selectedGoals.length > 0
                      ? healthData.selectedGoals.join(", ")
                      : "No goals set"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Button to Generate Suggestions */}
          <Row className="mb-4">
            <Col className="text-center">
              <Button
                onClick={handleGenerateSuggestions}
                disabled={loading}
                className="btn-primary"
                style={{ backgroundColor: "#50E3C2", border: "none" }}
              >
                {loading ? "Generating..." : "Generate Suggestions"}
              </Button>
            </Col>
          </Row>

          {/* Display Suggestions */}
          {suggestions.length > 0 && (
            <Row className="mt-4">
              {suggestions.map((suggestion, index) => (
                <Col key={index} md={4} className="mb-3">
                  <Card
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className="h-100 shadow-sm suggestion-card"
                  >
                    <Card.Body>
                      <Card.Text>{suggestion}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          {/* Popup for Selected Suggestion */}
          <Modal show={showPopup} onHide={handleClosePopup} centered size="lg">
            <Modal.Header closeButton style={{ backgroundColor: "#4A90E2", color: "#FFF" }}>
              <Modal.Title>Detailed Suggestion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {detailsLoading ? (
                <div className="text-center">
                  <Spinner animation="border" role="status" style={{ color: "#50E3C2" }}>
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <>
                  <h5 style={{ color: "#4A90E2" }}>{selectedSuggestion}</h5>
                  <p>{suggestionDetails}</p>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClosePopup}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default SuggestionForm;