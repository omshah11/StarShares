import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../../features/counter/counterSlice'; // Importing the counter slice reducer
import userReducer from '../../features/user/userSlice'; // Importing the user slice reducer

// Configure the Redux store with reducers for managing state
export default configureStore({
  reducer: {
      counter: counterReducer, // Assigning the counter slice reducer under the 'counter' key
      user: userReducer, // Assigning the user slice reducer under the 'user' key
  }
});
