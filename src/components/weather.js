import React from 'react'
import { connect } from 'react-redux'
import { fetchWeather, setDay, setUnit } from '../store'
import { addCity } from '../store/cities'
import getLocation from '../store/weather'
import { getHistoricalWeatherData } from '../store/historicalData'
import { withRouter } from 'react-router-dom'
// import Search from './search'

class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      location: '',
      latitude: '',
      longitude: '',
      date: '',
      summary: '',
      lo: '',
      hi: '',
      handleYesterDay: '',
      handleTomorrow: '',
      day: '',
      unit: '',
      pressure: '',
      humidity: '',
      visbility: '',
      windspeed: '',
      sunrise: '',
      sunset: '',

      handleUnitChange: '',
    }

    this.submitCity = this.submitCity.bind(this)
  }

  async submitCity(e) {
    e.preventDefault()
    if (this.props.location !== '') {
      this.setState({ code: '' })
      await this.props.addCity(this.props.location)
      // this.props.getCities();

      //await this.props.addCity("ISELIN,US")
      console.log('Cities is ' + this.props.cities)
      this.props.getHistoricalWeatherData(this.props.cities)
    }
  }

  render() {
    return (
      <div className="weather">
        {/* <Search /> */}
        <div className="weather-info">
          <div className="weather-toggle">
            <div className="col-md-5 weather-location">
              {this.props.location}
            </div>
            {/* <span className="input-group-btn"> */}
            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.submitCity}
              >
                Add Location
              </button>
            </div>
            {/* </span> */}
          </div>

          {/* <button
            className="glyphicon glyphicon-menu-left"
            disabled={day <= 0}
            onClick={() => {
              handleYesterDay(latitude, longitude, day)
            }}
          /> */}
          <div>
            <h3 className="weather-date">{this.props.date}</h3>
            {/* <button
            className="glyphicon glyphicon-menu-right"
            disabled={day >= 7}
            onClick={() => {
              handleTomorrow(latitude, longitude, day)
            }}
          />*/}

            {/* <p className="weather-summary"> */}
            <h3 className="weather-summary">{this.props.summary}</h3>
          </div>
          {/* </p> */}
          {/* <div className="weather-icon">
          <Skycon icon={formattedIcon || 'CLOUDY'} />
        </div> */}
          {/* <p className="weather-precip">{Math.round(precip * 100)}% chance of {preciptype}</p> */}
          <div className="weather-temp">
            <div className="weather-unit">
              <form>
                <select name="unit" onChange={this.props.handleUnitChange}>
                  <option value="F">F</option>
                  <option value="C">C</option>
                </select>
              </form>
            </div>
            <div className="weather-temp-nums">
              <div>
                <p>
                  Low:{' '}
                  {this.props.unit === 'F'
                    ? Math.round(this.props.lo)
                    : Math.round((this.props.lo - 32) * (5 / 9))}
                  °{this.props.unit}{' '}
                </p>
                <p>
                  High:{' '}
                  {this.props.unit === 'F'
                    ? Math.round(this.props.hi)
                    : Math.round((this.props.hi - 32) * (5 / 9))}
                  °{this.props.unit}
                </p>
                <p>Pressure: {this.props.pressure} hPa</p>
              </div>
              <div>
                <p>Sunrise: {this.props.sunrise}</p>
                <p>Sunset: {this.props.sunset}</p>
                <p>Wind Speed: {this.props.windspeed} meter/sec</p>
              </div>
            </div>
            {/* <div>
              <p>
                Sunrise:
                {this.props.sunrise}
              </p>
            </div> */}
          </div>
          {/* <a href="#suggestions">
          <span className="glyphicon glyphicon-menu-down" />
        </a> */}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  date: state.weather.date,
  summary: state.weather.summary,
  icon: state.weather.icon,
  precip: state.weather.precip,
  lo: state.weather.lo,
  hi: state.weather.hi,
  day: state.weather.day,
  unit: state.weather.unit,
  preciptype: state.weather.preciptype,
  location: state.weather.location,
  cities: state.cities,
  pressure: state.weather.pressure,
  sunrise: state.weather.sunrise,
  sunset: state.weather.sunset,
  visibility: state.weather.visibility,
  windspeed: state.weather.windspeed,
})

const mapDispatch = dispatch => {
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
    addCity: city => dispatch(addCity(city)),
    getLocation: city => dispatch(getLocation(city)),
    getHistoricalWeatherData: cities =>
      dispatch(getHistoricalWeatherData(cities)),
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(Weather)
)
