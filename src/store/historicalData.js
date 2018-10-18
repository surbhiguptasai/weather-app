
  import axios from 'axios';
 
  const GET_HISTORICAL_DATA = 'GET_HISTORICAL_DATA'
 

  const getHistoricalData = historicalData => ({type: GET_HISTORICAL_DATA, historicalData})


  const historicalWeatherData=[];

 


  export const getHistoricalWeatherData = (cities) => 
 async dispatch => {
 let out=[];
 let count=0
  await cities.forEach(function (city) {
      
     axios.get(`https://api.worldweatheronline.com/premium/v1/past-weather.ashx?q=${city}&key=${process.env.REACT_APP_WORLD_WEATHER_API_KEY}&format=json&tp=24&date=2018-09-01&enddate=2018-09-30`)
    .then(res => {
        count++;
        out.push(res.data)
        if(count===cities.length)
        {
        dispatch(getHistoricalData(out))
        }

    })
    .catch(err => console.log("Error Received",err))
  });



}

    /**
 * REDUCER
 */
export default function (state = historicalWeatherData, action) {
    switch (action.type) {
      case GET_HISTORICAL_DATA:
        return action.historicalData
       
   
      default:
        return state
    }
  }