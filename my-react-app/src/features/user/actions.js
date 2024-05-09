import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectToken, selectUserId } from './userSlice';

export const fetchRecentlyViewedArtists = createAsyncThunk(
  'user/fetchRecentlyViewedArtists',
  async (_, { getState }) => {
    const userId = getUserIdFromState(getState()); // Modify this function to get userId from the state
    const token = selectToken(getState());
    const response = await axios.get(`http://localhost:5000/api/recently-viewed-artists?userId=${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const addRecentlyViewedArtist = createAsyncThunk(
  'user/addRecentlyViewedArtist',
  async (artistId, { getState }) => {
    // Get the user ID and token from the Redux state
    const userId = getUserIdFromState(getState()) 
    const token = selectToken(getState());

    try {
      // Make the axios post request to add the recently viewed artist
      await axios.post(`http://localhost:5000/api/recently-viewed-artists?userId=${userId}&artistId=${artistId}`, {userId:userId, artistId: artistId}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Return the artistId
      return artistId;
    } catch (error) {
      // Handle any errors
      console.error('Error adding recently viewed artist:', error);
      throw error; // Rethrow the error to be caught by the component
    }
  }
);


export const removeRecentlyViewedArtist = createAsyncThunk(
  'user/removeRecentlyViewedArtist',
  async (_, { getState }) => {
    const userId = getUserIdFromState(getState()); // Modify this function to get userId from the state
    const token = selectToken(getState());
    await axios.delete('/recently-viewed-artists', {
      data: { userId },
      headers: { Authorization: `Bearer ${token}` },
    });
  }
);

// Helper function to get userId from the state
const getUserIdFromState = (state) => {
  // Modify this function based on how userId is stored in the state
  return selectUserId(state) 
};
