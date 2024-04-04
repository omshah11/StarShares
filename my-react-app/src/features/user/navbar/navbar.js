// Import necessary dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './navbar.css';
import SearchBar from '../search/searchbar';

// Functional component for the Navbar
const Navbar = () => {
  return (
    <nav className="bgcolorSS2 flex justify-between items-center px-4 py-2 text-white">
      {/* Brand name on the top left */}
      <div className="brand text-lg font-bold">
        <Link to="/home">Star Shares</Link>
      </div>

      {/* Andy's original code */}
      {/* Search bar in the center */}
      {/* <div className="search-bar">
        <input type="text" placeholder="Search..."/>
        <input id="search" type="button" value="search" onClick={Search}></input>
        {/* <button type="button">Search</button> */}
      {/*</div> */}

      {/* Implementing my code from searchbar.js*/}
      <SearchBar/>
      
      {/* Features on the top right */}
      {/* <div className="features">
        <Link to="/about-us">About Us</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/watchlist">Watchlist</Link> */}
      {/* Features on the top right Kanayo Anyakpor Worked On Styling Components.*/}
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
