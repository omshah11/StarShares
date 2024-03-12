import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/search-page?searchInput=${searchInput}`);
  };

  return (
    <div className="search-bar">
      <Container>
        <InputGroup className='mb-3' size='lg'>
          <FormControl
            placeholder="Search For Artist"
            type="input"
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={handleButtonClick}>
            Search
          </Button>
        </InputGroup>
      </Container>
    </div>
  );
}

export default SearchBar;