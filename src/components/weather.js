import React from 'react'
import { connect } from 'react-redux'
import { fetchWeather, setDay, setUnit } from '../store'
// import Search from './search'

function Weather(props) {
  const {
    location,
    latitude,
    longitude,
    date,
    summary,
    lo,
    hi,
    handleYesterDay,
    handleTomorrow,
    day,
    unit,
    handleUnitChange,
  } = props

  return (
    <div className="weather">
      {/* <Search /> */}
      <div className="weather-info">
        <h2 className="weather-location">{location}</h2>
        <div className="weather-toggle">
          <button
            className="glyphicon glyphicon-menu-left"
            disabled={day <= 0}
            onClick={() => {
              handleYesterDay(latitude, longitude, day)
            }}
          />
          <h3 className="weather-date">{date}</h3>
          <button
            className="glyphicon glyphicon-menu-right"
            disabled={day >= 7}
            onClick={() => {
              handleTomorrow(latitude, longitude, day)
            }}
          />
        </div>
        <p className="weather-summary">{summary}</p>
        {/* <div className="weather-icon">
          <Skycon icon={formattedIcon || 'CLOUDY'} />
        </div> */}
        {/* <p className="weather-precip">{Math.round(precip * 100)}% chance of {preciptype}</p> */}
        <div className="weather-temp">
          <form>
            <select name="unit" onChange={handleUnitChange}>
              <option value="F">F</option>
              <option value="C">C</option>
            </select>
          </form>
          <div className="weather-temp-nums">
            <p>
              Low:{' '}
              {unit === 'F' ? Math.round(lo) : Math.round((lo - 32) * (5 / 9))}°
              {unit}{' '}
            </p>
            <p>
              High:{' '}
              {unit === 'F' ? Math.round(hi) : Math.round((hi - 32) * (5 / 9))}°
              {unit}
            </p>
          </div>
        </div>
        {/* <a href="#suggestions">
          <span className="glyphicon glyphicon-menu-down" />
        </a> */}
      </div>
    </div>
  )
}

const mapStateToProps = function(state) {
  return {
    // location: state.user.location,
    // longitude: state.user.longitude,
    // latitude: state.user.latitude,
    date: state.weather.date,
    summary: state.weather.summary,
    icon: state.weather.icon,
    precip: state.weather.precip,
    lo: state.weather.lo,
    hi: state.weather.hi,
    day: state.weather.day,
    unit: state.weather.unit,
    preciptype: state.weather.preciptype,
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    handleYesterDay(latitude, longitude, day) {
      if (day > 0) {
        dispatch(setDay(day - 1))
        dispatch(fetchWeather(latitude, longitude, day - 1))
      }
    },
    handleTomorrow(latitude, longitude, day) {
      if (day < 7) {
        dispatch(setDay(day + 1))
        dispatch(fetchWeather(latitude, longitude, day + 1))
      }
    },
    handleUnitChange(event) {
      dispatch(setUnit(event.target.value))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Weather)
