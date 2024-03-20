// Import necessary dependencies
// import React from 'react';
import "./searchPage.css"
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
    let artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=album,artist', searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setItems(data.artists.items);
        setItems(data.albums.items);
        //setItems(data.tracks.items);
      });

    //console.log("Artist ID is " + artistID)
  }

  const openModal = () => {
    var modalWrap = document.createElement('div');
    modalWrap.innerHTML = `
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // console.log(process.env.CLIENT_ID)
  // console.log(process.env.CLIENT_SECRET)
  search();
  return (
    <div>
      {/* <Container> */}
      {/* <Row className='mx-2 row row-cols-5'> */}
      {/* <Row> */}
        {/* <Col className='col-5 col-md-6'> */}
      {items.map((item, i) => {
          console.log(item);
          return(
            // <Card>
            //   {/* <Card.Img scr={item.images[0]}/> */}
            //   <Card.Body>
            //     <Card.Title>{item.name}</Card.Title>
            //   </Card.Body>
            // </Card>
            <div>
              <Container>
                <Row className='mx-2 row row-cols-5'>
                  <Button onClick={openModal}>
                    {item.name}
                  </Button>
                </Row>
              </Container>
              
            </div>
          )
        })}
        {/* </Col> */}
      {/* </Row> */}
    {/* </Container> */}
  </div>
  );
};

export default SearchPage;
