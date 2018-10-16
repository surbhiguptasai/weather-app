import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import weather from './weather'
import user from './user'
import currentLocation from './currentLocation'




// Use for production
const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
    createLogger({
      collapsed: true
    })
  )
)
const reducer = combineReducers({user, weather,currentLocation})
const store = createStore(reducer, middleware)





export default store

export * from './user'
export * from './weather'