import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
    name: 'spotifyQuery',
    initialState: {
        searchInput: ""
    },
    reducers: {

        getInput: (state, action) => {
            state.searchInput = action.payload.searchInput
        }
    },
});

export const { getInput } = searchSlice.actions

export default searchSlice.reducer