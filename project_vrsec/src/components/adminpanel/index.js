import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBell, FaUsers, FaPaperPlane } from "react-icons/fa";
import "./index.css"; // Custom CSS for vibrant colors and animations
import Navbar from "../adminnavbar";
import Users from "../Users/User";
import UserDetails from "../userdetails";
const Navbar = () => {
  
  return (
   <>
   <Navbar />
<Users />
<UserDetails/>
   </>
  );
};

export default Navbar;