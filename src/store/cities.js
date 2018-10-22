const ADD_CITY= 'ADD_CITY'
const REMOVE_CITY = 'REMOVE_CITY'
const GET_CITIES = 'GET_CITIES'

export const addCity = code => ({
  type: ADD_CITY,
  code
})
export const removeCity = code => ({
  type: REMOVE_CITY,
  code
})

export const getCities = () => ({
  type: GET_CITIES,
})

const cities = (state = cities, action) => {
  switch (action.type) {
    case ADD_CITY:
      if (
        state !== null &&
        state.length !== 0 &&
        Object.keys(state).length !== 0
      ) {
        let existingSymbols = state
        existingSymbols.push(action.code)

        return Object.assign([], existingSymbols)
      } else {
        let codesToAdd = action.code
        if (Array.isArray(codesToAdd)) return action.code
        else {
          return [action.code]
        }
      }
    case REMOVE_CITY:
      let updatedStocks = state
      if (updatedStocks.length === 1) {
        updatedStocks = []
        return updatedStocks
      } else {
        updatedStocks = updatedStocks.filter(function(item) {
          return item.search(action.code) === -1
        })
      }
      return updatedStocks
    
      case GET_CITIES:
      return state


    default:
      return state
  }
}

export default cities
