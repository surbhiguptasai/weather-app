import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import history from './history'
import store from './store'
import './index.css'
import App from './components/App'
import {Router} from 'react-router-dom'
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