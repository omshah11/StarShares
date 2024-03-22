import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
    name: 'spotifyQuery',
    initialState: {
        searchInput: ""
    },
    reducers: {
        getInput: (state, action) => {
            state.searchInput = action.payload.searchInput
        },
        getAccessToken: (state, action) => {
            state.accessToken = action.payload.accessToken
        },
        getTokenDate: (state, action) => {
            state.accessToken = action.payload.accessToken
        }
    },
});

export const { getInput, getAccessToken, getTokenDate } = searchSlice.actions
export default searchSlice.reducer