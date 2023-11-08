import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './root/app/App'
import store from './root/app/store'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)