// Import necessary dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './navbar.css';
import Search from '../search/searchbar';

// Functional component for the Navbar
const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Brand name on the top left */}
      <div className="brand">
      <Link to="/home">Star Shares</Link>
      </div>

      {/* Search bar in the center */}
      {/* <div className="search-bar">
        <input type="text" placeholder="Search..."/>
        <input id="search" type="button" value="search" onClick={Search}></input>
        {/* <button type="button">Search</button> */}
      {/*</div> */}
      <Search/>
      
      {/* Features on the top right */}
      <div className="features">
        <Link to="/about-us">About Us</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

// Export the Navbar component
export default Navbar;
