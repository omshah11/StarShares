import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getAccessToken from './auth'; // Import the getAccessToken function

const RecentlyPlayedButton = () => {
  const [recentTrack, setRecentTrack] = useState(null);

  useEffect(() => {
    // Fetch the user's recently played tracks
    getAccessToken().then((token) => {
      axios.get('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
          Authorization: `Bearer ${token}`, // Use the actual access token
        },
      })
      .then((response) => {
        const mostRecentTrack = response.data.items[0]; // Get the most recent track
        setRecentTrack(mostRecentTrack);
      })
      .catch((error) => {
        console.error('Error fetching recently played tracks:', error);
      });
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
