import React from 'react';
import './profile.css'; // Your CSS file for styling

const DummyPlayButton = () => {
  const handlePlay = () => {
    // Handle play action (e.g., log a message)
    console.log('Playing...');
  };

  return (
    <button className="dummy-play-button" onClick={handlePlay}>
      ▶️ Play
    </button>
  );
};

export default DummyPlayButton;
