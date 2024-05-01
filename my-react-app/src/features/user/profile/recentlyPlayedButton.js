import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecentlyPlayedButton = () => {
  const [recentTrack, setRecentTrack] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const handleButtonClick = () => {
    // Navigate to the website when the button is clicked
    window.open('https://accounts.spotify.com/en/login?continue=https%3A%2F%2Faccounts.spotify.com%2Fauthorize%3Fscope%3Duser-read-private%2Buser-read-playback-state%2Buser-modify-playback-state%2Buser-read-currently-playing%26response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fdiscord.com%252Fapi%252Fconnections%252Fspotify%252Fcallback%26state%3D75275ddc8fb171848477ed8ae07cc244%26client_id%3D0f78f47360a748f09a66bbfb400cafa0');
  };

  useEffect(() => {
    // Function to fetch access token
    const getAccessToken = async () => {
      try {
        const response = await axios.get('/auth/spotify'); // Endpoint to retrieve access token
        setAccessToken(response.data.access_token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    getAccessToken();
  }, []);

  useEffect(() => {
    if (accessToken) {
      // Fetch the user's recently played tracks
      axios.get('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const mostRecentTrack = response.data.items[0];
        setRecentTrack(mostRecentTrack);
      })
      .catch((error) => {
        console.error('Error fetching recently played tracks:', error);
      });
    }
  }, [accessToken]);

  const handlePlay = () => {
    // Play the most recent track using Spotify Web Playback SDK
    if (recentTrack) {
      console.log('Playing:', recentTrack.track.name);
      // Add code to play the track using Spotify Web Playback SDK
    } else {
      console.log('No recent tracks found.');
    }
  };

  return (
    <div>
      <button className="play-button" onClick={handlePlay}> Play Recent Track </button>
      <button className='connection' onClick={handleButtonClick}>Connect to Spotify</button>
    </div>
    );
};

export default RecentlyPlayedButton;
