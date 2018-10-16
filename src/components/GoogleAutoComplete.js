import React from 'react'
import { connect } from 'react-redux'
import  {fetchWeather,fetchWeatherBasedOnCity,fetchForecastWeather,fetchForecastWeatherBasedOnCity} from '../store/weather';
class GoogleAutocomplete extends React.Component
{
    componentDidMount() {
        let autoComplete = new window.google.maps.places.Autocomplete(this.refs.location)
        this.props.handleSubmitBasedonCity(this.refs.location.value)
        autoComplete.addListener('place_changed', () => {
            let place = autoComplete.getPlace();
            let lat = place.geometry.location.lat();
            let lng = place.geometry.location.lng();
            this.props.handleSubmit(lat,lng)
    
          });
	}

	render() {
    let city='New York,NY,USA';
    if(this.props.currentLocation!=null)
    {
    city=this.props.currentLocation.location.city
    console.log("City is "+city)
    }
		return (
			<div>
				<input type="search" className="custom-search-class" defaultValue={city} placeholder="Search weather by city" ref="location"/>
			</div>
		);
	}
}
  const mapState = state => ({  })
  const mapDispatchToProps = function(dispatch) {
      
    return {
      handleSubmit(lat,lng) {
        console.log("Dispatching fetchwether detaile!"+lat)
          dispatch(fetchWeather(lat,lng,0));
          dispatch(fetchForecastWeather(lat,lng,0));
      },
      handleSubmitBasedonCity(city) {
        console.log("Dispatching fetchwether detaile!"+city)
          dispatch(fetchWeatherBasedOnCity(city));
         dispatch(fetchForecastWeatherBasedOnCity(city));
      }
    };
  };
  export default connect(
    mapState,
    mapDispatchToProps
  )(GoogleAutocomplete)
