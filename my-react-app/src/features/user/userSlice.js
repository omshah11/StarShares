import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isLoggedIn: false,
        token: null
    },
    reducers: {

        login: (state, action) => {
            state.user = action.payload.user
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
        },
        logout: (state) => {
            state.user = null
            state.isLoggedIn = false
            state.token = null
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload.user;
          },
    },
});

export const { login, logout, setCurrentUser } = userSlice.actions

export const selectUser = (state) => state.user;
export const selectToken = (state) => state.token;

export default userSlice.reducer