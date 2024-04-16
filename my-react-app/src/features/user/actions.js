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
    const userId = getUserIdFromState(getState()); // Modify this function to get userId from the state
    const token = selectToken(getState());
    await axios.post('/recently-viewed-artists', { userId, artistId }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return artistId;
  }
);

export const removeRecentlyViewedArtist = createAsyncThunk(
  'user/removeRecentlyViewedArtist',
  async (_, { getState }) => {
    const userID = getUserIdFromState(getState()); // Modify this function to get userId from the state
    const token = selectToken(getState());
    await axios.delete('/recently-viewed-artists', {
      data: { userID },
      headers: { Authorization: `Bearer ${token}` },
    });
  }
);

// Helper function to get userId from the state
const getUserIdFromState = (state) => {
  // Modify this function based on how userId is stored in the state
  return selectUserId(state) 
};
