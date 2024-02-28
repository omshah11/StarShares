import {Container, InputGroup, FormControl, Button, Row, Card, Dropdown} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { getInput } from './searchSlice';
import { useDispatch } from 'react-redux';

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleButtonClick = () => {
  //   setButtonClicked(true); // Set buttonClicked state to true
    dispatch(getInput({
      searchInput: searchInput
    }));
    navigate("/search-page");
  //   search(); // Call fetchData function to fetch data from the API
  };

  // console.log(items);
  return (
    <div className="search-bar">
      <Container>
        <InputGroup className='mb-3' size='lg'>
          <FormControl
            placeholder="Search For Artist"
            type="input"
            onKeyPress={event => {
              if (event.key == "Enter"){
                navigate("/search-page");
                //search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={handleButtonClick}>
            Search
          </Button>

          {/* <div>
            <button onClick={handleButtonClick}>Search</button>
            {buttonClicked //&& (
            //   <select>
            //     {items.map((album, index) => (
            //       <option key={index} value={album.name}>
            //         {album.name}
            //       </option>
            //     ))}
            // </select>)
            }
          </div> */}
        </InputGroup>
      </Container>

    </div>
  );
}

export default SearchBar;