import {Container, InputGroup, FormControl, Button, Row, Card, Dropdown} from 'react-bootstrap';
import {useState, useEffect} from 'react';

const CLIENT_ID = "2f6e085b55bc4ede9131e2d7d7739c30";
const CLIENT_SECRET = "88eeb98034e5422099cce4f6467a3d51";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
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
      //.then(data => console.log(data))

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

  const handleButtonClick = () => {
    setButtonClicked(true); // Set buttonClicked state to true
    search(); // Call fetchData function to fetch data from the API
  };

  console.log(albums);
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
                {albums.map((album, index) => (
                  <option key={index} value={album.name}>
                    <img src={album.images[2].url} style={{ width: '20px', marginRight: '5px' }} />
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
