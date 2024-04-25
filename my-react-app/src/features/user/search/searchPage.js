import "./searchPage.css"
import { Form, Button, Row, Col, Card, Modal, ModalFooter} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAccessToken, getTokenDate } from './searchSlice';

const CLIENT_ID = "2f6e085b55bc4ede9131e2d7d7739c30";
const CLIENT_SECRET = "88eeb98034e5422099cce4f6467a3d51";
const SearchPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    artist: true,
    album: true,
    track: true
  });
  const spotifyAcessToken = useSelector(search => search.searchQuery.accessToken);

  useEffect(() => {
    // Retrieve search input from URL query parameter
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('searchInput');
    console.log("QUERY IS " + query);
    if (query) {
      console.log("searched: " + query);
      // console.log("Here");
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
    // if(!spotifyAcessToken || spotifyAcessToken === ""){
        // const tokenExpirationDate = new Date(Date.now() + (60 * 60 * 1000)).toLocaleTimeString('PST'); // Adding 60 minutes in milliseconds
        // dispatch(getTokenDate({tokenExpirationDate: tokenExpirationDate}))
        fetch('https://accounts.spotify.com/api/token', authParameters)
        .then(result => result.json())
        .then(data => dispatch(getAccessToken({accessToken: data.access_token})))
        // .then(date => dispatch(getTokenDate({tokenExpirationDate: tokenExpirationDate})))
        // .then(date => console.log(date))
        // .then(data => accessToken)
    // }
  }, [])

  // Search
  async function search(searchInput) {
    //console.log("Search for " + searchInput);
    // console.log("Access token: ", accessToken);
    let allItems = [];
    let searchTypes = Object.entries(filters)
      .filter(([_, enabled]) => enabled)
      .map(([type, _]) => type)
      .join(',');

    // Get request using search
    let searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + spotifyAcessToken
      }
    }
    
    // let searchData = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist,album,track', searchParameters)
    let searchData = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=' + searchTypes, searchParameters)
      .then(response => response.json())


      console.log("Reached here");
      // Add artists items to the array
      if (searchData.artists) {
        allItems.push(...searchData.artists.items);
        console.log(searchData.artists)
      }

      // Add albums items to the array
      if (searchData.albums) {
        allItems.push(...searchData.albums.items);
        console.log(searchData.albums)
      }

      // Add tracks items to the array
      if (searchData.tracks) {
        allItems.push(...searchData.tracks.items);
        console.log(searchData.tracks)
      }

      // Set the combined array to the results state
      setResults(allItems);
    
  }

  function msToMinutesAndSeconds(durationInMs) {
    const minutes = Math.floor(durationInMs / 60000); // 1 minute = 60000 milliseconds
    const seconds = ((durationInMs % 60000) / 1000).toFixed(0); // Remaining milliseconds after minutes converted to seconds
    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`; // Format seconds with leading zero if less than 10
  }

  const handleFilterChange = (filterName) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName]
    }));
  }

  const handleCardClick = (track) => {
    setSelectedCard(track);
    setShowModal(true);
    setScrollPosition(window.scrollY);
  };

  const handleModalClose = () => {
    setShowModal(false);
    window.scrollTo(0, scrollPosition); // Restore scroll position
  };

  const handleStockBtn = (artistName, artistId) => {
    navigate(`/artist?name=${artistName}&id=${artistId}`);
    console.log("navigating to stockpage")
  };

  const fb = () => {
    search(searchInput)
    handleSearchSubmit()
    fetchArtistDescription(searchResults[0].id)
    console.log("bruh")
    // console.log(artistDescription)
  }

  const [artistDescription, setArtistDescription] = useState('');
  const fetchArtistDescription = async (artistId) => {
    try {
      const response = await fetch(
        `https://api.genius.com/artists/${artistId}?access_token=g8J7SWDhjrS2W1eVOmZSubSEtv2HJyBzRT1OEHR_NWOoj8tbu739v7u2RtN6dsJV`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch artist description');
      }
      const data = await response.json();
      // setArtistDescription(data.response.artist.description.plain);
      setArtistDescription(data.response.artist.description.dom.children);
      console.log(artistDescription)
    } catch (error) {
      console.error('Error fetching artist description:', error);
    }
  };

  const [searchResults, setSearchResults] = useState([]);
  const handleSearchSubmit = async (event) => {
    // event.preventDefault();
    try {
      const response = await fetch(
        `https://api.genius.com/search?q=${encodeURIComponent(searchInput)}&access_token=g8J7SWDhjrS2W1eVOmZSubSEtv2HJyBzRT1OEHR_NWOoj8tbu739v7u2RtN6dsJV`
      );
      if (!response.ok) {
        throw new Error('Failed to search for artists');
      }
      const data = await response.json(); 
      setSearchResults(data.response.hits.map(hit => ({
        id: hit.result.primary_artist.id,
        name: hit.result.primary_artist.name
      })));
      console.log("heya")
      console.log(searchResults.id)
    } catch (error) {
      console.error('Error searching for artists:', error);
    }
  };

  return (
    <div className="page">
      <div className="header">
        <div className="filters">
          <Button
            className={`filter-button ${filters.artist ? "active" : ""}`}
            onClick={() => handleFilterChange('artist')}
          >
            Artist
          </Button>
          <Button
            className={`filter-button ${filters.album ? "active" : ""}`}
            onClick={() => handleFilterChange('album')}
          >
            Album
          </Button>
          <Button
            className={`filter-button ${filters.track ? "active" : ""}`}
            onClick={() => handleFilterChange('track')}
          >
            Track
          </Button>
          {/* <Button onClick={search(searchInput)}></Button> */}
          </div>
          <div><Button className="enter-filter" onClick={fb}>Filter</Button></div>
      </div>
      <div className="results">
        {results.map((item) => (
            <div key={item.id} className="col-md-4 mb-3">
              <Card onClick={() => handleCardClick(item)}>
                {item.type === 'track' ? (
                  <>
                    <Card.Img variant="top" src={item.album.images && item.album.images.length > 0 ? item.album.images[0].url : 'placeholder-url'} />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.type}</Card.Text>
                    </Card.Body>
                  </>
                ) : (
                  <>
                    <Card.Img variant="top" src={item.images && item.images.length > 0 ? item.images[0].url : 'https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1'} />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.type}</Card.Text>
                    </Card.Body>
                  </>
                )}
              </Card>
            </div>
          ))}

        <Modal show={showModal} onHide={handleModalClose}>
          <div className="modal-container">
            <div className="modal-content">
              <Modal.Header className="modal-header" closeButton>
                <Modal.Title>{selectedCard && selectedCard.name}</Modal.Title>
                <Button className="close" onClick={handleModalClose}>X</Button>
              </Modal.Header>
              <Modal.Body>
                {selectedCard && (
                  <>
                  {selectedCard.type === 'track' ? (
                    <>
                      <div className="left">
                        {selectedCard && selectedCard.album.images && selectedCard.album.images.length > 0 && (
                          <img src={selectedCard.album.images[0].url} alt={selectedCard.name} style={{ width: '100%', height: 'auto' }} />
                        )}
                      </div>
                      <div className="right">
                        Album: {selectedCard.album.name}<br></br>
                        Track number: {selectedCard.track_number}<br></br>
                        Release date: {selectedCard.album.release_date}<br></br>
                        Run time: {msToMinutesAndSeconds(selectedCard.duration_ms)}
                        {selectedCard.artists.map((artist) => (
                        <Button
                          key={artist.id}
                          variant="outline-primary"
                          className="stockBtn"
                          onClick={() => handleStockBtn(artist.name, artist.id)}
                        >
                          {artist.name}
                        </Button>
                      ))}
                      </div>
                    </>
                  ) : selectedCard.type === 'album' ? (
                    <>
                      <div className="left">
                        {selectedCard && selectedCard.images && selectedCard.images.length > 0 && (
                          <img src={selectedCard.images[0].url} alt={selectedCard.name} style={{ width: '100%', height: 'auto' }} />
                        )}
                      </div>
                      <div className="right">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                        {/* <p>{selectedCard.artists.map(artist => artist.name).join(', ')}</p> */}
                        {/* <Button className="stockBtn">Artist Page</Button> */}
                        {selectedCard.artists.map((artist) => (
                        <Button
                          key={artist.id}
                          variant="outline-primary"
                          className="stockBtn"
                          onClick={() => handleStockBtn(artist.name, artist.id)}
                        >
                          {artist.name}
                        </Button>
                      ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="left">
                        {selectedCard && selectedCard.images && selectedCard.images.length > 0 && (
                          <img src={selectedCard.images[0].url} alt={selectedCard.name} style={{ width: '100%', height: 'auto' }} />
                        )}
                      </div>
                      <div className="right">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                        <Button className="stockBtn" onClick={() => handleStockBtn(selectedCard.name, selectedCard.id)}>{selectedCard.name}</Button>
                      </div>
                    </>
                  )}
                  </>
                )}
               
              </Modal.Body>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SearchPage;
