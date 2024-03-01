// Import necessary dependencies
// import React from 'react';
import "./searchPage.css"
import {Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import {useState, useEffect, React, useContext} from 'react';
import {useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';

const CLIENT_ID = "2f6e085b55bc4ede9131e2d7d7739c30";
const CLIENT_SECRET = "88eeb98034e5422099cce4f6467a3d51";

// About Us page component
const SearchPage = () => {
  const searchInput = useSelector(search => search.searchQuery.searchInput);
  const [accessToken, setAccessToken] = useState("");
  const [items, setItems] = useState([])
  const [buttonClicked, setButtonClicked] = useState(false);
  const { state } = useLocation();

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
    let artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=album,artist,track', searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setItems(data.artists.items);
        setItems(data.albums.items);
        setItems(data.tracks.items);
      });

    console.log("Artist ID is " + artistID)
  }

  // console.log(process.env.CLIENT_ID)
  // console.log(process.env.CLIENT_SECRET)
  search();
  return (
    <div>
      <Container>
      <Row className='mx-2 row row-cols-5'>
      {items.map((item, i) => {
          console.log(item);
          return(
            <Card>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
              </Card.Body>
            </Card>
          )
        })}
      </Row>
    </Container>
  </div>
  );
};

export default SearchPage;
