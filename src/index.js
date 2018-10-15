import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import history from './history'
import store from './store'
import './index.css'
import App from './App'
import {
    BrowserRouter as Router,
    Route
  } from 'react-router-dom';
import * as serviceWorker from './serviceWorker'



ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
serviceWorker.unregister()