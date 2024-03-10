// RecentlyPlayedButton.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecentlyPlayedButton = () => {
  const [recentTrack, setRecentTrack] = useState(null);

  // Fetch the user's recently played tracks (use your own API call)
  useEffect(() => {
    // Fetch logic here (e.g., using Axios or fetch)
    // Fetch the user's recently played tracks
    axios.get('https://api.spotify.com/v1/me/player/recently-played', {
      headers: {
        Authorization: `YOUR_ACCESS_TOKEN`, // Replace with your actual access token
      },
    })
    .then((response) => {
      const mostRecentTrack = response.data.items[0]; // Get the most recent track
      setRecentTrack(mostRecentTrack);
    })
    .catch((error) => {
      console.error('Error fetching recently played tracks:', error);
    });
  }, []);

  const handlePlay = () => {
    // Play the most recent track using Spotify Web Playback SDK
    console.log('Playing:', recentTrack.track.name);
  };

  return (
    <button className="play-button" onClick={handlePlay}>
      ▶️ Play Most Recent Track
    </button>
  );
};

export default RecentlyPlayedButton;
