import React, { createContext, useState, useContext } from 'react';
import Cookies from 'js-cookie';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('authToken'));

  // Login function
  const login = () => {
    setIsLoggedIn(true);
  };

  // Logout function
  const logout = () => {
    Cookies.remove('authToken');
    Cookies.remove('userID');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);