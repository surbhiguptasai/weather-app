import React from 'react'
import Weather from './weather'
import Form from './form'
import Fivedays from './fiveDaysForecast'
import { getCurrentLocation } from '../store/currentLocation'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


class App extends React.Component {
  async componentDidMount() {
    await this.props.loadInitialData()
  }
  

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="">
            <div className="">
              <div className="">
                {/* <div className="col-xs-5 title-container">
                  <Titles />
                </div> */}
                <div className="">
                  <Form loadWeather={this.getWeather} />
                  <Weather />
                  <Fivedays />
                  {/* <charts/> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(getCurrentLocation())
    },
  }
}
const mapState = state => {
  return {
    location: state.currentLocation.location,
  }
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(App)
)
