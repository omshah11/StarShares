import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../../features/counter/counterSlice'
import userReducer from '../../features/user/userSlice'
import searchReducer from '../../features/user/search/searchSlice'

export default configureStore({
  reducer: {
      counter: counterReducer,
      user: userReducer,
      searchQuery: searchReducer
  }
})