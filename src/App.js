import React from 'react'
import Weather from './weather'
import Form from './form'
import Titles from './titles'
import charts from './charts'
import Routes from './Routes'
import Fivedays from './fiveDaysForecast'
import { getCurrentLocation } from './store/currentLocation'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Api_Key1 = process.env.REACT_APP_OPEN_WEATHER_API_KEY

class App extends React.Component {
  async componentDidMount() {
    console.log('Loading Initial Data *****************')
    await this.props.loadInitialData()
  }
  // state = {
  //   temperature: undefined,
  //   city: undefined,
  //   country: undefined,
  //   humidity: undefined,
  //   description: undefined,
  //   error: undefined,
  // }

  //getWeather is a method we'll use to make the api call
  // getWeather = async e => {
  //   const city = e.target.elements.city.value
  //   const country = e.target.elements.country.value
  //   e.preventDefault()
  //   const api_call = await fetch(
  //     `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key1}`
  //   )
  //   const response = await api_call.json()
  //   console.log(response)
  //   if (city && country) {
  //     this.setState({
  //       temperature: response.main.temp,
  //       city: response.name,
  //       country: response.sys.country,
  //       humidity: response.main.humidity,
  //       description: response.weather[0].description,
  //       error: '',
  //     })
  //   } else {
  //     this.setState({
  //       error: 'Please input search values...',
  //     })
  //   }
  // }

  render() {
    console.log('Api_Key1 is ***************' + Api_Key1)
    console.log('Location is  ***************' + this.props.location)

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
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    location: state.currentLocation.location,
  }
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(App)
)
