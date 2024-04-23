import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import counterReducer from '../../features/counter/counterSlice';
import userReducer from '../../features/user/userSlice';
import searchReducer from '../../features/user/search/searchSlice'

const rootReducer = combineReducers({
  user: userReducer,
  counter: counterReducer,
  searchQuery: searchReducer
  // Add other reducers as needed
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  // serialize: false, // Ignore serializing certain actions
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Use configureStore to create the Redux store
const store = configureStore({
  reducer: persistedReducer, // Pass the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
