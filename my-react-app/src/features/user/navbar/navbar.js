// Import necessary dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './navbar.css';

// Functional component for the Navbar
const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Brand name on the top left */}
      <div className="brand">
        <span>Star Shares</span>
      </div>

      {/* Search bar in the center */}
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        {/* <button type="button">Search</button> */}
      </div>

      {/* Features on the top right */}
      <div className="features">
        <a href="#about-us">About Us</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#watchlist">Watchlist</a>
        <a href="#profile">Profile</a>
      </div>
    </nav>
  );
};

// Export the Navbar component
export default Navbar;
