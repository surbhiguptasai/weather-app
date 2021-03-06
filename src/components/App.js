import React from 'react'
import Weather from './weather'
import Form from './form'
import Fivedays from './fiveDaysForecast'
import { getCurrentLocation } from '../store/currentLocation'
import { getHistoricalWeatherData } from '../store/historicalData'
import {
  addStartDateForHistoricalData,
  addEndDateForHistoricalData,
} from '../store/date'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Chart from './charts'
import { addCity, removeCity } from '../store/cities'
import AddCity from './addCity'
import Cities from './cities'
import Titles from './titles'
import  MapContainer   from './MapContainer';
import  getLocation from '../store/weather'

class App extends React.Component {
  constructor() {
    super()
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
  }

  async handleRemoveClick(code) {
    await this.props.removeCity(code)
    await this.props.loadInitialData(this.props.cities)
  }

  async componentDidMount() {
    let citiesToMonitor = process.env.REACT_APP_DEFAULT_CITIES_TO_MONITOR.split(
      '|'
    )
    let startDate = process.env.REACT_APP_DEFAULT_START_DATE
    let endDate = process.env.REACT_APP_DEFAULT_END_DATE

    //
    await this.props.addStartDate(startDate)
    await this.props.addEndDate(endDate)
    await this.props.addCity(citiesToMonitor)
    await this.props.loadInitialData(citiesToMonitor)
  }

  render() {


    if (
      this.props.cities !== undefined &&
      this.props.cities !== null &&
      this.props.cities !== null &&
      Object.keys(this.props.cities).length !== 0
    ) {
      return (
        <div>
          <div className="wrapper">
            <div className="">
              <div className="">
                <div className="col-xs-12 title-border">
                  <Titles />
                </div>
                <div className="col-xs-12 col-md-5">
                  <Form />
                  <MapContainer/>
                </div>
                {/* <div className="col-md-" /> */}
                <div className=" col-xs-12 col-md-7">
                <Weather />
                <Fivedays />
                </div>
                <div className=" col-xs-12 col-md-12">
                  <AddCity />
                  <Cities />
                  <Chart />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return <div>Loading</div>
    }
  }
}
const mapDispatch = dispatch => {
  return {
    loadInitialData(cities) {
      dispatch(getCurrentLocation())
      dispatch(getHistoricalWeatherData(cities))
    },
    addCity: symbol => dispatch(addCity(symbol)),
    removeCity: code => dispatch(removeCity(code)),
    addStartDate: code => dispatch(addStartDateForHistoricalData(code)),
    addEndDate: code => dispatch(addEndDateForHistoricalData(code)),
    getLocation: city => dispatch(getLocation(city))
  }
}
const mapState = state => {
  return {
    location: state.currentLocation.location,
    cities: state.cities,
  }
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(App)
)
