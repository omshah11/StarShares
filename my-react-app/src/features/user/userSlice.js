import { createSlice } from '@reduxjs/toolkit';
import { fetchRecentlyViewedArtists, addRecentlyViewedArtist, removeRecentlyViewedArtist } from './actions';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
        user: {},
        isLoggedIn: false,
        token: null,
        recentlyViewedArtists: [],
        loading: false,
        error: null,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
            state.userId = action.payload.user.userId;
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.user = {};
            state.isLoggedIn = false;
            state.token = null;
            localStorage.removeItem('token');
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload.user;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecentlyViewedArtists.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecentlyViewedArtists.fulfilled, (state, action) => {
                state.recentlyViewedArtists = action.payload;
                state.loading = false;
            })
            .addCase(fetchRecentlyViewedArtists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addRecentlyViewedArtist.fulfilled, (state, action) => {
                state.recentlyViewedArtists.unshift(action.payload);
                state.recentlyViewedArtists = state.recentlyViewedArtists.slice(0, 10);
            })
            .addCase(removeRecentlyViewedArtist.fulfilled, (state) => {
                state.recentlyViewedArtists.shift();
            });
    },
});

export const { login, logout, setCurrentUser } = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectToken = (state) => state.user.token;
export const selectRecentlyViewedArtists = (state) => state.user.recentlyViewedArtists;
export const selectUserId = (state) => state.user.userId;

export default userSlice.reducer;
