import axios from 'axios'
const camelcase = require('camelcase')
var moment = require('moment-timezone')
/**
 * ACTION TYPES
 */
const GET_DATE = 'GET_DATE'
const GET_SUMMARY = 'GET_SUMMARY'
const GET_ICON = 'GET_ICON'
const GET_LO = 'GET_LO'
const GET_HI = 'GET_HI'
const SET_DAY = 'SET_DAY'
const SET_UNIT = 'SET_UNIT'
const GET_FORCAST = 'GET_FORCAST'
const GET_LOCATION1 = 'GET_LOCATION1'

const GET_PRESSURE = 'GET_PRESSURE'
const GET_HUMIDITY = 'GET_HUMIDITY'
const GET_VISIBILITY = 'GET_VISIBILITY'
const GET_WIND_SPEED = 'GET_WIND_SPEED'
const GET_SUNRISE = 'GET_SUNRISE'
const GET_SUNSET = 'GET_SUNSET'

/**
 * INITIAL STATE
 */
const weather = {
  day: 0,
  date: '',
  summary: '',
  icon: '',
  precip: 0,
  precipType: 'rain',
  lo: 0,
  hi: 0,
  precipId: 0,
  cloudId: 0,
  tempId: 0,
  unit: 'F',
  pressure:'',
  humidity:'',
  visbility:'',
  windspeed:'',
  sunrise:'',
  sunset:'',
  forecast: {
    day1: {
      day: undefined,
      min: undefined,
      max: undefined,
      id: undefined,
    },
    day2: {
      day: undefined,
      min: undefined,
      max: undefined,
      id: undefined,
    },
    day3: {
      day: undefined,
      min: undefined,
      max: undefined,
      id: undefined,
    },
    day4: {
      day: undefined,
      min: undefined,
      max: undefined,
      id: undefined,
    },
    day5: {
      day: undefined,
      min: undefined,
      max: undefined,
      id: undefined,
    },
  },
}

/**
 * ACTION CREATORS
 */
const getDate = date => ({ type: GET_DATE, date })
const getSummary = summary => ({ type: GET_SUMMARY, summary })
const getIcon = icon => ({ type: GET_ICON, icon })
const getLo = lo => ({ type: GET_LO, lo })
const getHi = hi => ({ type: GET_HI, hi })
const getForecast = forecast => ({ type: GET_FORCAST, forecast })
const getLocation = location => ({ type: GET_LOCATION1, location })


const getPressure = pressure => ({ type: GET_PRESSURE, pressure })
const getHumidity = humidity => ({ type: GET_HUMIDITY, humidity })
const getVisibility = visibility => ({ type: GET_VISIBILITY, visibility })
const getWinSpeed = windspeed => ({ type: GET_WIND_SPEED, windspeed })
const getSunRise = sunrise => ({ type: GET_SUNRISE, sunrise })
const getSunset = sunset => ({ type: GET_SUNSET, sunset })

export const setDay = day => ({ type: SET_DAY, day })
export const setUnit = unit => ({ type: SET_UNIT, unit })

function retriveSkyCons(weatherDetails) {
  let icon = ''
  switch (weatherDetails) {
    case 'Clouds':
      icon = 'CLOUDY'
      break
    case 'y':
      break
    default:
  }
  return icon
}
/**
 * THUNK CREATORS
 */

export const newDate = (date, tz) => dispatch => {
  var now = moment.tz(date * 1000, tz).format('MMMM Do YYYY')
  dispatch(getDate(now))
}

export const fetchWeather = (latitude, longitude, day) => dispatch =>
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${
        process.env.REACT_APP_OPEN_WEATHER_API_KEY
      }`
    )
    .then(res => {
      let iconsky = retriveSkyCons(res.data.weather[0].main)
      dispatch(newDate(res.data.dt, res.data.timezone))
      dispatch(getSummary(res.data.weather[0].description))
      dispatch(getIcon(iconsky))
      // dispatch(getPrecip(res.data.precip))
      // dispatch(getPrecipType(res.data.preciptype || 'rain'))
      dispatch(getLo(res.data.main.temp_min))
      dispatch(getHi(res.data.main.temp_max))
      // dispatch(getPrecipId(ids.precipId))
      // dispatch(getCloudId(ids.cloudId))
      dispatch(getLocation(res.data.name))

      dispatch(getPressure(res.data.main.pressure))
      dispatch(getHumidity(res.data.main.humidity))
      dispatch(getVisibility(res.data.visibility))
      dispatch(getWinSpeed(res.data.wind.speed))
      dispatch(getSunRise(res.data.sys.sunrise))
      dispatch(getSunset(res.data.sys.sunset))



      // dispatch(fetchPrecipSuggestions(ids.precipId))
      // dispatch(fetchCloudCoverSuggestions(ids.cloudId))
      // dispatch(fetchTempSuggestions(ids.tempId))
    })
    .catch(err => console.log('Error Received'))

export const fetchWeatherBasedOnCity = city => dispatch =>
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${
        process.env.REACT_APP_OPEN_WEATHER_API_KEY
      }`
    )
    .then(res => {
      console.log('got results' + JSON.stringify(res.data))
      console.log('Summary is ' + res.data.weather[0].description)
      // let ids = weatherIdCreator(res.data);
      let iconsky = retriveSkyCons(res.data.weather[0].main)
      dispatch(newDate(res.data.dt, res.data.timezone))
      dispatch(getSummary(res.data.weather[0].description))
      dispatch(getIcon(iconsky))
      // dispatch(getPrecip(res.data.precip))
      // dispatch(getPrecipType(res.data.preciptype || 'rain'))
      dispatch(getLo(res.data.main.temp_min))
      dispatch(getHi(res.data.main.temp_max))
      dispatch(getLocation(res.data.name))
      // dispatch(getPrecipId(ids.precipId))
      // dispatch(getCloudId(ids.cloudId))
      // dispatch(getTempId(ids.tempId))
      // dispatch(fetchPrecipSuggestions(ids.precipId))
      // dispatch(fetchCloudCoverSuggestions(ids.cloudId))
      // dispatch(fetchTempSuggestions(ids.tempId))
      dispatch(getPressure(res.data.main.pressure))
      dispatch(getHumidity(res.data.main.humidity))
      dispatch(getVisibility(res.data.visibility))
      dispatch(getWinSpeed(res.data.wind.speed))
      dispatch(getSunRise(res.data.sys.sunrise))
      dispatch(getSunset(res.data.sys.sunset))
    })
    .catch(err => console.log('Error Received'))

export const fetchForecastWeather = (latitude, longitude, day) => dispatch =>
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${
        process.env.REACT_APP_OPEN_WEATHER_API_KEY
      }`
    )
    .then(res => {
      // console.log("got results"+JSON.stringify(res.data))
      weather.forecast.day1.min = res.data.list[0].main.temp_min
      weather.forecast.day1.max = res.data.list[0].main.temp_max
      weather.forecast.day1.day = res.data.list[0].main.temp
      weather.forecast.day1.id = res.data.list[0].weather[0].id

      weather.forecast.day2.min = res.data.list[8].main.temp_min
      weather.forecast.day2.max = res.data.list[8].main.temp_max
      weather.forecast.day2.day = res.data.list[8].main.temp
      weather.forecast.day2.id = res.data.list[8].weather[0].id

      weather.forecast.day3.min = res.data.list[16].main.temp_min
      weather.forecast.day3.max = res.data.list[16].main.temp_max
      weather.forecast.day3.day = res.data.list[16].main.temp
      weather.forecast.day3.id = res.data.list[16].weather[0].id

      weather.forecast.day4.min = res.data.list[24].main.temp_min
      weather.forecast.day4.max = res.data.list[24].main.temp_max
      weather.forecast.day4.day = res.data.list[24].main.temp
      weather.forecast.day4.id = res.data.list[24].weather[0].id

      weather.forecast.day5.min = res.data.list[32].main.temp_min
      weather.forecast.day5.max = res.data.list[32].main.temp_max
      weather.forecast.day5.day = res.data.list[32].main.temp
      weather.forecast.day5.id = res.data.list[32].weather[0].id

      dispatch(getForecast(weather))
    })
    .catch(err => console.log('Error Received', err))

export const fetchForecastWeatherBasedOnCity = city => dispatch =>
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${
        process.env.REACT_APP_OPEN_WEATHER_API_KEY
      }`
    )
    .then(res => {
      // console.log("got results"+JSON.stringify(res.data))
      weather.forecast.day1.min = res.data.list[0].main.temp_min
      weather.forecast.day1.max = res.data.list[0].main.temp_max
      weather.forecast.day1.day = res.data.list[0].main.temp
      weather.forecast.day1.id = res.data.list[0].weather[0].id

      weather.forecast.day2.min = res.data.list[8].main.temp_min
      weather.forecast.day2.max = res.data.list[8].main.temp_max
      weather.forecast.day2.day = res.data.list[8].main.temp
      weather.forecast.day2.id = res.data.list[8].weather[0].id

      weather.forecast.day3.min = res.data.list[16].main.temp_min
      weather.forecast.day3.max = res.data.list[16].main.temp_max
      weather.forecast.day3.day = res.data.list[16].main.temp
      weather.forecast.day3.id = res.data.list[16].weather[0].id

      weather.forecast.day4.min = res.data.list[24].main.temp_min
      weather.forecast.day4.max = res.data.list[24].main.temp_max
      weather.forecast.day4.day = res.data.list[24].main.temp
      weather.forecast.day4.id = res.data.list[24].weather[0].id

      weather.forecast.day5.min = res.data.list[0].main.temp_min
      weather.forecast.day5.max = res.data.list[0].main.temp_max
      weather.forecast.day5.day = res.data.list[0].main.temp
      weather.forecast.day5.id = res.data.list[0].weather[0].id

      dispatch(getForecast(weather))
    })
    .catch(err => console.log('Error Received', err))

/**
 * REDUCER
 */
export default function(state = weather, action) {
  switch (action.type) {
    case GET_DATE:
      return Object.assign({}, state, { date: action.date })
    case GET_SUMMARY:
      return Object.assign({}, state, { summary: action.summary.toUpperCase() })
    case GET_ICON:
      return Object.assign({}, state, { icon: action.icon })
    // case GET_PRECIP:
    //     return Object.assign({}, state, {precip: action.precip})
    // case GET_PRECIP_TYPE:
    //     return Object.assign({}, state, {preciptype: action.preciptype})
    case GET_LO:
      return Object.assign({}, state, { lo: action.lo })
    case GET_HI:
      return Object.assign({}, state, { hi: action.hi })
    // case GET_PRECIP_ID:
    //     return Object.assign({}, state, {precipId: action.id})
    // case GET_CLOUD_ID:
    //     return Object.assign({}, state, {cloudId: action.id})
    case GET_LOCATION1:
      return Object.assign({}, state, { location: action.location })
    case SET_DAY:
      return Object.assign({}, state, { day: action.day })
    case SET_UNIT:
      return Object.assign({}, state, { unit: action.unit })

    case GET_FORCAST:
      return Object.assign({}, state, { weather: action.weather })




      case GET_PRESSURE:
      return Object.assign({}, state, { pressure: action.pressure })
      case GET_HUMIDITY:
      return Object.assign({}, state, { humidity: action.humidity })
      case GET_VISIBILITY:
      return Object.assign({}, state, { visibility: action.visibility })
      case GET_WIND_SPEED:
      return Object.assign({}, state, { windspeed: action.windspeed })
      case GET_SUNRISE:
      return Object.assign({}, state, { sunrise: action.sunrise })
      case GET_SUNSET:
      return Object.assign({}, state, { sunset: action.sunset })
    default:
      return state
  }
}
