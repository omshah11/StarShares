// Import necessary dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './navbar.css';
import {Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import {useState, useEffect} from 'react';

const CLIENT_ID = "2f6e085b55bc4ede9131e2d7d7739c30";
const CLIENT_SECRET = "88eeb98034e5422099cce4f6467a3d51";

const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    //API Access Token
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

// Search
async function search() {
  console.log("Search for " + searchInput); //Bruno Mars

  // Get request using search to get the Artist ID
  var searchParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  }
  var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
    .then(response => response.json())
    .then(data => {return data.artists.items[0].id})

  console.log("Artist ID is " + artistID)
  // Get request with Artist ID grab all the albums from that artist
  var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setAlbums(data.items);
    });
  // Display those items to the user
}

// Functional component for the Navbar
const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Brand name on the top left */}
      <div className="brand">
      <Link to="/home">Star Shares</Link>
      </div>

      {/* Search bar in the center */}
      <div className="search-bar">
        <input type="text" placeholder="Search..." onKeyDown={event => {
              if (event.key == "Enter"){
                search();
              }
            }}/>
        {/* <button type="button">Search</button> */}
      </div>

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
