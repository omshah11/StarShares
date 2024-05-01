import axios from 'axios';

const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';

async function getAccessToken() {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
  }
}

export default getAccessToken;
