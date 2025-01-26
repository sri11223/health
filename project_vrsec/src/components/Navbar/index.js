import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cookies from 'js-cookie';
import { useAuth } from "../../authcontext"; // Import the useAuth hook

function AppNavbar() {
  const { isLoggedIn, logout } = useAuth(); // Use the global authentication state
  const navigate = useNavigate();

  // Handle login
  const handleLogin = () => {
    navigate('/login'); // Redirect to the login page
  };

  // Handle signup
  const handleSignup = () => {
    navigate('/signup'); // Redirect to the signup page
  };

  // Handle logout
  const handleLogout = () => {
    // Remove the JWT token from cookies
    Cookies.remove('authToken');
    Cookies.remove('userID');
    logout(); // Update the global authentication state
    navigate('/'); // Redirect to the home page after logout
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{
        background: isLoggedIn ? '#FFFFFF' : 'linear-gradient(90deg, #00C853, #00B8D4)', // Change background color based on login status
        borderBottom: isLoggedIn ? '1px solid #e0e0e0' : '2px solid #009624', // Adjust border based on login status
        fontSize: isLoggedIn ? '1.1rem' : '1rem', // Increase font size when logged in
      }}
      variant={isLoggedIn ? 'light' : 'dark'} // Change variant based on login status
    >
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            color: isLoggedIn ? '#000000' : '#FFFFFF', // Change text color based on login status
            fontWeight: 'bold',
            fontSize: isLoggedIn ? '1.5rem' : '1.25rem', // Increase font size when logged in
          }}
        >
          <i className="fas fa-heartbeat me-2"></i>Health Assistant
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        {/* Navbar Links */}
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Conditional Rendering for Nav Links */}
          <Nav className="mx-auto" style={{ fontSize: '1.2rem' }}> {/* Center links and increase font size */}
            {!isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/" style={{ color: isLoggedIn ? '#000000' : '#FFFFFF' }}>Home</Nav.Link>
                <Nav.Link as={Link} to="/features" style={{ color: isLoggedIn ? '#000000' : '#FFFFFF' }}>Features</Nav.Link>
                <Nav.Link as={Link} to="/about" style={{ color: isLoggedIn ? '#000000' : '#FFFFFF' }}>About Us</Nav.Link>
                <Nav.Link as={Link} to="/contact" style={{ color: isLoggedIn ? '#000000' : '#FFFFFF' }}>Contact</Nav.Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/workout" style={{ color: isLoggedIn ? '#000000' : '#FFFFFF' }}>Workout</Nav.Link>
                <Nav.Link as={Link} to="/dietplan" style={{ color: isLoggedIn ? '#000000' : '#FFFFFF' }}>Diet</Nav.Link>
                <Nav.Link as={Link} to="/progress" style={{ color: isLoggedIn ? '#000000' : '#FFFFFF' }}>Progress</Nav.Link>
                <Nav.Link as={Link} to="/aiinsights" style={{ color: isLoggedIn ? '#000000' : '#FFFFFF' }}>AI InSights</Nav.Link>
              </>
            )}
          </Nav>

          {/* Conditional Rendering for Login/Signup or Logout/Profile */}
          <Nav>
            {isLoggedIn ? (
              <>
                {/* Profile Dropdown */}
                <NavDropdown
                  title={
                    <span style={{ color: isLoggedIn ? '#000000' : '#FFFFFF' }}>
                      <i className="fas fa-user-circle me-1"></i>Profile
                    </span>
                  }
                  id="profile-dropdown"
                  align="end" // Align dropdown to the right
                >
                  <NavDropdown.Item as={Link} to="/editprofile" style={{ color: '#000000' }}>
                    <i className="fas fa-edit me-2"></i>Edit Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} style={{ color: '#000000' }}>
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Button variant="outline-light" className="me-2" onClick={handleLogin}>
                  <i className="fas fa-sign-in-alt me-1"></i>Login
                </Button>
                <Button variant="success" onClick={handleSignup} style={{ backgroundColor: '#00C853', borderColor: '#00C853' }}>
                  <i className="fas fa-user-plus me-1"></i>Signup
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;