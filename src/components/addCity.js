import React, { Component } from 'react'
import { addCity, getCities } from '../store/cities'
import { getHistoricalWeatherData } from '../store/historicalData'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class AddCity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
    }
    this.handleCodeChange = this.handleCodeChange.bind(this)
    this.submitCity = this.submitCity.bind(this)
  }

  handleCodeChange(e) {
    this.setState({ code: e.target.value.trim() })
  }

  async submitCity(e) {
    e.preventDefault()
    if (this.state.code !== '') {
      this.setState({ code: '' })
      await this.props.addCity(this.state.code)
      this.props.getCities()

      //await this.props.addCity("ISELIN,US")
      console.log('Cities is ' + this.props.cities)
      this.props.getHistoricalWeatherData(this.props.cities)
    }
  }

  render() {
    // const hasError = this.props.notification.hasOwnProperty('message')
    return (
      <div className="add-city-container">
        <div className="input-group" />
        {/* {hasError && (
          <div className="alert alert-danger" role="alert">
            {this.props.notification.message}
          </div>
        )} */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cities: state.cities,
})

const mapDispatch = dispatch => {
  return {
    addCity: city => dispatch(addCity(city)),
    getHistoricalWeatherData: cities =>
      dispatch(getHistoricalWeatherData(cities)),
    getCities: () => dispatch(getCities()),
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(AddCity)
)
