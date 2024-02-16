// Import necessary dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import "./navbar.css";

// Functional component for the Navbar
const Navbar = () => {
  return (
    <nav className="bgcolor flex justify-between items-center px-4 py-2 text-white">
      {/* Brand name on the top left */}
      <div className="brand text-lg font-bold">
        <Link to="/home">Star Shares</Link>
      </div>

      {/* Search bar in the center */}
      <div className="search-bar flex items-center">
        <input type="text" placeholder="Search..." className="mr-4 px-2 py-1 rounded border" />
        {/* <button type="button">Search</button> */}
      </div>

      {/* Features on the top right */}
      <div className="features flex items-center">
        <Link to="/about-us" className="mr-4">About Us</Link>
        <Link to="/portfolio" className="mr-4">Portfolio</Link>
        <Link to="/watchlist" className="mr-4">Watchlist</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

// Export the Navbar component
export default Navbar;
