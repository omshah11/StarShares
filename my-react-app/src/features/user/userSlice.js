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
        watchlist: null,
        profileBio: "This is the Default Bio",
        profileImage: '',
        balance: null,
        ownedStockList: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
            state.userId = action.payload.user.userId;
            state.balance = action.payload.balance;
            localStorage.setItem('token', action.payload.token);
        },
        // Reducer function for handling user logout
        logout: (state, action) => {

            state.user = action.payload.user;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
            state.currentUser = action.payload.currentUser;
            state.watchlist = action.payload.watchlist;
            state.recentlyViewedArtists = action.payload.recentlyViewedArtists;
            state.profileBio = action.payload.profileBio;

            localStorage.removeItem('token');
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload.user; // Set current user
        },
        // Reducer function for setting user watchlist
        setUserWatchlist: (state, action) => {
            state.watchlist = action.payload.watchlist
        },
        updateProfileBio: (state, action) => {
            state.user.profileBio = action.payload; // Update the profileBio in the state
        },
        updateProfile: (state, action) => {
            state.user = action.payload; // Update the user object with the payload
        },
        setOwnedStocksList: (state, action) => {
            state.ownedStockList = action.payload.ownedStockList;
        },
        setUserBalance: (state, action) => {
            state.balance = action.payload.balance;
        }
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

// Export actions for user login, logout, and setting current user
export const { login, logout, setCurrentUser, setUserWatchlist, updateProfileBio, updateProfile, setOwnedStocksList, setUserBalance } = userSlice.actions;


export const selectUser = (state) => state.user;
export const selectToken = (state) => state.user.token;
export const selectRecentlyViewedArtists = (state) => state.user.recentlyViewedArtists;
export const selectUserId = (state) => state.user.userId;

export default userSlice.reducer;
