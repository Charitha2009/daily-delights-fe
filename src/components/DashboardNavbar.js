import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';
import Icon from '../Images/icon.png'; 
import { FaSearch, FaSignOutAlt } from 'react-icons/fa'; 
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { SiGoogletagmanager } from "react-icons/si";
import { FaHome } from "react-icons/fa";

const DashboardNavbar = ({ searchQuery, setSearchQuery }) => {

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={Icon} alt="Daily Delights Icon" className='icon-img' />
        <Link to="/dashboard" className="navbar-brand">Daily Delights</Link>
      </div>
      <div className="navbar-middle">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <div type="submit" className="search-button">
            <FaSearch />
          </div>
        </form>
      </div>
      <div className="navbar-right">
        <Link to="/manageProducts" className='navbar-item'><SiGoogletagmanager /></Link>
        <Link to="/dashboard" className='navbar-item'><FaHome /></Link>
        <Link to="/settings" className='navbar-item'><FaUserCircle /></Link>
        <Link to="/cart" className='navbar-item'><FaShoppingCart /></Link>
        <Link to="/login" className="navbar-item"><FaSignOutAlt /></Link>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
