const ADD_START_DATE = 'ADD_START_DATE'
const ADD_END_DATE = 'ADD_END_DATE'
const addStartDate = startDate => ({type: ADD_START_DATE, startDate})
const addEndDate = endDate => ({type: ADD_END_DATE, endDate})
export const addStartDateForHistoricalData = (startDate) => 
async dispatch => {

       dispatch(addStartDate(startDate))
  
 };

 export const addEndDateForHistoricalData = (endDate) => 
async dispatch => {

       dispatch(addEndDate(endDate))
  
 };
     /**
 * REDUCER
 */
export default function (state = {}, action) {
    switch (action.type) {
        case ADD_START_DATE:
        return Object.assign({}, state, {startDate: action.startDate})
        case ADD_END_DATE:
        return Object.assign({}, state, {endDate: action.endDate})
   
      default:
        return state
    }
  }