import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './root/app/App'
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from './root/app/store.js';

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)