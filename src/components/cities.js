import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getCurrentLocation } from '../store/currentLocation'
import { getHistoricalWeatherData } from '../store/historicalData'
import {addCity, removeCity} from '../store/cities'
import CityInfo from './cityinfo'


class Cities extends React.Component {
    constructor() {
        super()
        this.handleRemoveClick = this.handleRemoveClick.bind(this)
      } 
      async handleRemoveClick(code) {
        await this.props.removeCity(code)
        await this.props.loadInitialData(this.props.cities)
      }
  render() {
      return(
    this.props.cities.map(city => (
        <div key={city}>
          <CityInfo
            city={city}
            onClick={() => this.handleRemoveClick(city)}
          />
        </div>
      ))
    )
  }
}
const mapDispatch = dispatch => {
    return {
      loadInitialData(cities) {
        
        dispatch(getCurrentLocation())
        dispatch(getHistoricalWeatherData(cities))
      },
      addCity: symbol => dispatch(addCity(symbol)),
      removeCity: code => dispatch(removeCity(code))
    }
  }

  const mapState = state => {
    return {
      cities:state.cities
    }
  }
  
  export default withRouter(
    connect(
      mapState,
      mapDispatch
    )(Cities)
  )