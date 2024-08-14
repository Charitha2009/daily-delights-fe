// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css'; // Optional: for styling the navbar
import Icon from '../Images/icon.png'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={Icon} className='icon-img'></img>
        <Link to="/" className="navbar-brand">Daily Delights</Link>
      </div>
      <div className="navbar-right">
        <Link to="/" className="navbar-item">Home</Link>
        <Link to="/login" className="navbar-item">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
