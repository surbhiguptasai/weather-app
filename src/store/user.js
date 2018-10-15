// import axios from 'axios'

// /**
//  * ACTION TYPES
//  */
// const SET_LOCATION = 'SET_LOCATION'

// /**
//  * INITIAL STATE
//  */
// const location = []

// /**
//  * ACTION CREATORS
//  */
// const setLocation = loc => ({type: SET_LOCATION, loc})

// /**
//  * THUNK CREATORS
//  */
// export const setLocation = () =>
//   dispatch =>
//     axios.get('/api/items')
//       .then(res => {
//         dispatch(setLocation(res.data))
//       })
//       .catch(err => console.log(err))

// /**
//  * REDUCER
//  */
// export default function (state = allItems, action) {
//   switch (action.type) {
//     case SET_LOCATION:
//       return action.items
//     default:
//       return state
//   }
// }