import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  InputBase,
  Switch,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu"; // For mobile menu
import AccountCircle from "@mui/icons-material/AccountCircle"; // For profile
import SearchIcon from "@mui/icons-material/Search"; // For search bar
import Brightness4Icon from "@mui/icons-material/Brightness4"; // For dark mode
import Brightness7Icon from "@mui/icons-material/Brightness7"; // For light mode
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [open, setOpen] = useState(false); // State to control the notification dialog
  const [message, setMessage] = useState(""); // State to store the message
  const [anchorEl, setAnchorEl] = useState(null); // State for dropdown menu
  const [searchQuery, setSearchQuery] = useState(""); // State for search bar
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for mobile screens
  const navigate = useNavigate();

  // Open the notification dialog
  const handleOpen = () => {
    setOpen(true);
  };

  // Close the notification dialog
  const handleClose = () => {
    setOpen(false);
    setMessage(""); // Clear the message
  };

  // Send the notification to all users
  const sendNotification = () => {
    if (message.trim() === "") {
      toast.error("Please enter a message.");
      return;
    }

    // Simulate sending a notification (replace with actual API call)
    toast.success(Notification sent: "${message}");
    handleClose(); // Close the dialog
  };

  // Handle dropdown menu open
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle dropdown menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle profile click
  const handleProfile = () => {
    navigate("/profile"); // Navigate to profile page
    handleMenuClose(); // Close the menu
  };

  // Handle logout
  const handleLogout = () => {
    // Simulate logout (replace with actual logout logic)
    toast.success("Logged out successfully");
    navigate("/login"); // Navigate to login page
    handleMenuClose(); // Close the menu
  };

  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      toast.error("Please enter a search query.");
      return;
    }

    // Simulate search (replace with actual search logic)
    toast.success(Searching for: "${searchQuery}");
    setSearchQuery(""); // Clear the search query
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Apply dark mode styles (you can use a theme provider for this)
    document.body.style.backgroundColor = darkMode ? "#ffffff" : "#121212";
    document.body.style.color = darkMode ? "#000000" : "#ffffff";
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: darkMode ? "#121212" : "#1e3a8a" }}>
        <Toolbar>
          {/* Logo or Title */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", color: "#ffffff" }}
          >
            Admin Portal
          </Typography>

          {/* Search Bar */}
          <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
            <InputBase
              placeholder="Search…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ color: "#ffffff", marginRight: 1 }}
            />
            <IconButton onClick={handleSearch} sx={{ color: "#ffffff" }}>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Users Button */}
          <Button
            color="inherit"
            component={Link}
            to="/users"
            sx={{
              color: "#ffffff",
              marginRight: 2,
              "&:hover": { backgroundColor: "#3b82f6" },
            }}
          >
            Users
          </Button>

          {/* Notification Icon */}
          <IconButton
            color="inherit"
            onClick={handleOpen}
            sx={{
              color: "#ffffff",
              "&:hover": { backgroundColor: "#3b82f6" },
            }}
          >
            <NotificationsIcon />
          </IconButton>

          {/* Dark Mode Toggle */}
          <IconButton onClick={toggleDarkMode} sx={{ color: "#ffffff", marginRight: 2 }}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Profile Dropdown Menu */}
          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
            sx={{
              color: "#ffffff",
              "&:hover": { backgroundColor: "#3b82f6" },
            }}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ marginTop: 5 }}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>

          {/* Mobile Menu Icon (Optional) */}
          {isMobile && (
            <IconButton
              color="inherit"
              sx={{
                color: "#ffffff",
                "&:hover": { backgroundColor: "#3b82f6" },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Notification Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ backgroundColor: darkMode ? "#121212" : "#1e3a8a", color: "#ffffff" }}>
          Send Notification to All Users
        </DialogTitle>
        <DialogContent sx={{ padding: 3 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Message"
            type="text"
            fullWidth
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ padding: 2, backgroundColor: darkMode ? "#1e1e1e" : "#f3f4f6" }}>
          <Button
            onClick={handleClose}
            color="secondary"
            sx={{ color: darkMode ? "#ffffff" : "#1e3a8a", "&:hover": { backgroundColor: darkMode ? "#3b82f6" : "#d1d5db" } }}
          >
            Cancel
          </Button>
          <Button
            onClick={sendNotification}
            color="primary"
            sx={{
              backgroundColor: darkMode ? "#3b82f6" : "#1e3a8a",
              color: "#ffffff",
              "&:hover": { backgroundColor: darkMode ? "#1e3a8a" : "#3b82f6" },
            }}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Navbar;