// ACTION TYPES
import axios from 'axios';
const REMOVE_LOCATION = 'REMOVE_LOCATION'
const GET_LOCATION = 'GET_LOCATION'

// ACTION CREATORS

const removeCurrentZipcode = () => ({
  type: REMOVE_LOCATION,
})
const getLocation = location => ({type: GET_LOCATION, location})

// THUNK

export const getCurrentLocation = () =>
  async dispatch =>
   await axios.get(`http://ipinfo.io`)
    .then(res => {

        dispatch(getLocation(res.data))
   
    })
    .catch(err => console.log("Error Received"))

export const removeCurrentLocation = () => dispatch => {
  dispatch(removeCurrentZipcode())
}

// REDUCER

export default function(state = [], action) {
  switch (action.type) {
    case REMOVE_LOCATION:
      return []
    case GET_LOCATION:
    return Object.assign({}, state, {location: action.location})
    default:
      return state
  }
}