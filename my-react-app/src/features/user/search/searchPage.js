// Import necessary dependencies
// import React from 'react';
import "./searchPage.css"
// import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Col, Card, Modal} from 'react-bootstrap';
import {useState, useEffect, React, useContext} from 'react';
import {useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';

const CLIENT_ID = "2f6e085b55bc4ede9131e2d7d7739c30";
const CLIENT_SECRET = "88eeb98034e5422099cce4f6467a3d51";

const SearchPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Retrieve search input from URL query parameter
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('searchInput');
    console.log("QUERY IS " + query);
    if (query) {
      console.log("searched: " + query);
      console.log("Here");
      setSearchInput(query);
      search(query);
    }
  }, [location.search]);

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
  async function search(searchInput) {
    //console.log("Search for " + searchInput);
    console.log("Access token: ", accessToken);

    let allItems = [];

    // Get request using search
    let searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    
    let searchData = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist,album,track', searchParameters)
      .then(response => response.json())


      console.log("Reached here");
      // Add artists items to the array
      if (searchData.artists) {
        allItems.push(...searchData.artists.items);
      }

      // Add albums items to the array
      if (searchData.albums) {
        allItems.push(...searchData.albums.items);
      }

      // Add tracks items to the array
      if (searchData.tracks) {
        allItems.push(...searchData.tracks.items);
        console.log(searchData.tracks)
      }

      // Set the combined array to the results state
      setResults(allItems);
    
  }

  const handleCardClick = (track) => {
    setSelectedCard(track);
    setShowModal(true);
  };

  return (
    <div className="container">
      <div className="row">
        {results.map((item) => (
          <div key={item.id} className="col-md-4 mb-3">
            <Card onClick={() => handleCardClick(item)}>
              {item.type === 'track' ? (
                <>
                  <Card.Img variant="top" src={item.album.images && item.album.images.length > 0 ? item.album.images[0].url : 'placeholder-url'} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.type}</Card.Text>
                    {/* <Button variant="primary" onClick={() => handleCardClick(item)}>Open Modal</Button> */}
                  </Card.Body>
                </>
              ) : (
                <>
                  <Card.Img variant="top" src={item.images && item.images.length > 0 ? item.images[0].url : 'https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1'} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.type}</Card.Text>
                    {/* <Button variant="primary" onClick={() => handleCardClick(item)}>Open Modal</Button> */}
                  </Card.Body>
                </>
              )}
            </Card>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <div className="modal-container">
          <div className="modal-content">
            <Modal.Header closeButton>
              <Modal.Title>{selectedCard && selectedCard.name}</Modal.Title>
              {/* <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button> */}
              <Button onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Header>
            <Modal.Body>
              {selectedCard && selectedCard.type}
              {selectedCard && selectedCard.images && selectedCard.images.length > 0 && (
                <img src={selectedCard.images[0].url} alt={selectedCard.name} style={{ width: '50%', height: 'auto' }} />
              )}
            </Modal.Body>
            {/* <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer> */}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SearchPage;
