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

// About Us page component
const SearchPage = () => {
  const searchInput = useSelector(search => search.searchQuery.searchInput);
  const [accessToken, setAccessToken] = useState("");
  const [results, setResults] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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
    console.log("Search for " + searchInput);

    // Get request using search
    let searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    
    let artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist,album,track', searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setResults(data.artists.items);
        setResults(data.albums.items);
        setResults(data.tracks.items);
      });

    //console.log("Artist ID is " + artistID)
  }


  search();

  const handleCardClick = (track) => {
    setSelectedCard(track);
    setShowModal(true);
  };

  return (
    <div className="container">
      <div className="row">
        {results.map((artist) => (
          <div key={artist.id} className="col-md-4 mb-3">
            <Card>
            {/* <Card.Img variant="top" src={artist.images[0]} /> */}
              <Card.Body>
                <Card.Title>{artist.name}</Card.Title>
                <Card.Text>{artist.type}</Card.Text>
                <Button variant="primary" onClick={() => handleCardClick(artist)}>Open Modal</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <div className="modal-container">
          <div className="modal-content">
            <Modal.Header closeButton>
              <Modal.Title>{selectedCard && selectedCard.name}</Modal.Title>
              {/* Test */}
            </Modal.Header>
            <Modal.Body>
              {/* {selectedCard && selectedCard.type} */}
              {/* test */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SearchPage;
