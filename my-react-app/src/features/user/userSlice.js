import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isLoggedIn: false
    },
    reducers: {

        login: (state, action) => {
            state.user = action.payload.user
            state.isLoggedIn = action.payload.isLoggedIn
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload.user;
          },
    },
});

export const { login, logout, setCurrentUser } = userSlice.actions

export const selectUser = (state) => state.user;

export default userSlice.reducer