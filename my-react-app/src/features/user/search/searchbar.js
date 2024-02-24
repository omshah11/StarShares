import {Container, InputGroup, FormControl, Button, Row, Card, Dropdown} from 'react-bootstrap';
import {useState, useEffect} from 'react';

const CLIENT_ID = "2f6e085b55bc4ede9131e2d7d7739c30";
const CLIENT_SECRET = "88eeb98034e5422099cce4f6467a3d51";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [items, setItems] = useState([])
  const [buttonClicked, setButtonClicked] = useState(false);

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
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=album,artist,track', searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setItems(data.artists.items);
        setItems(data.albums.items);
        setItems(data.tracks.items);
      });

    console.log("Artist ID is " + artistID)
  }

  const handleButtonClick = () => {
    setButtonClicked(true); // Set buttonClicked state to true
    search(); // Call fetchData function to fetch data from the API
  };

  console.log(items);
  return (
    <div className="search-bar">
      <Container>
        <InputGroup className='mb-3' size='lg'>
          <FormControl
            placeholder="Search For Artist"
            type="input"
            onKeyPress={event => {
              if (event.key == "Enter"){
                search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />

          <div>
            <button onClick={handleButtonClick}>Search</button>
            {buttonClicked && (
              <select>
                {items.map((album, index) => (
                  <option key={index} value={album.name}>
                    {album.name}
                  </option>
                ))}
            </select>
            )}
          </div>
        </InputGroup>
      </Container>

    </div>
  );
}

export default Search;
