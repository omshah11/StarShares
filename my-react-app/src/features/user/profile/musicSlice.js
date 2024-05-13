import axios from 'axios';

const CLIENT_ID = "2f6e085b55bc4ede9131e2d7d7739c30";
const CLIENT_SECRET = "88eeb98034e5422099cce4f6467a3d51";

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
