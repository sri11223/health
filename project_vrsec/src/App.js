import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router
import { AuthProvider } from './authcontext'; // Import the AuthProvider
import AppNavbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; // For Font Awesome icons
import Home from './components/Home'; // Import the Home component
import SignupForm from './components/signup'; // Import the Signup component
import Footer from './components/Footer';
import LoginForm from './components/Login';
import QuestionsPage from './components/questionspage';
import UserDashboard from './components/userdashboard';
import WorkoutPage from './components/workouts';
import DietPlansPage from './components/dielplans';
import ProgressPage from './components/progress';
import SuggestionForm from './components/suggestions';
import ChatButton from './components/chatpopup';
import EditProfile from './components/editprofile';
import Features from './components/sectionfeatures';
import AboutUs from './components/about';
import ContactUs from './components/contactus';

function App() {
  return (
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <Router>
        <div>
          <AppNavbar /> {/* Navbar will appear on all pages */}
          <Routes>
            {/* Define the route for the Home page */}
            <Route path="/" element={<Home />} />
            {/* Define the route for the Signup page */}
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/questionpage" element={<QuestionsPage />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/workout" element={<WorkoutPage />} />
            <Route path="/dietplan" element={<DietPlansPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/aiinsights" element={<SuggestionForm />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
          <ChatButton />
          <Footer /> {/* Footer will appear on all pages */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;