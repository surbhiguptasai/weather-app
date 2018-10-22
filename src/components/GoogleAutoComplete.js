import React from 'react'
import { connect } from 'react-redux'
import Geocode from "react-geocode";
import  {fetchWeather,fetchWeatherBasedOnCity,fetchForecastWeather,fetchForecastWeatherBasedOnCity, setLatitude, setLongitude} from '../store/weather';
class GoogleAutocomplete extends React.Component
{
    async componentDidMount() {
        let autoComplete = new window.google.maps.places.Autocomplete(this.refs.location)
        this.props.handleSubmitBasedonCity(this.refs.location.value)
        Geocode.setApiKey("AIzaSyB4Aw7HKY9FKq_-J6_3FY13SNUBfCMsaaM");
       await Geocode.fromAddress(process.env.REACT_APP_DEFAULT_CITY_LOCATION).then(
          response => {
           
           let latitude = response.results[0].geometry.location.lat;
           let longitude=response.results[0].geometry.location.lng
           this.props.setLatitudeAndLongitude(latitude,longitude);

          },
          error => {
            console.error("Errr is ********************"+error);
          }
        );


        autoComplete.addListener('place_changed', () => {
            let place = autoComplete.getPlace();
            let lat = place.geometry.location.lat();
            let lng = place.geometry.location.lng();
        
            this.props.handleSubmit(lat,lng)
    
          });
	}

	render() {
    let city=process.env.REACT_APP_DEFAULT_CITY_LOCATION;
    if(this.props.location!=null)
    {
    city=this.props.location
    }
		return (
			<div>
				<input type="search" className="custom-search-class" defaultValue={city} placeholder="Search weather by city" ref="location"/>
			</div>
		);
	}
}
  const mapState = state => ({ location: state.weather.location })
  const mapDispatchToProps = function(dispatch) {
      
    return {
      handleSubmit(lat,lng) {
          dispatch(fetchWeather(lat,lng,0));
          dispatch(setLatitude(lat))
          dispatch(setLongitude(lng))
          dispatch(fetchForecastWeather(lat,lng,0));
      },
      handleSubmitBasedonCity(city) {
          dispatch(fetchWeatherBasedOnCity(city));
         dispatch(fetchForecastWeatherBasedOnCity(city));
      },
      setLatitudeAndLongitude(lat,lng)
      {
        dispatch(setLatitude(lat))
        dispatch(setLongitude(lng))

      }

    };
  };
  export default connect(
    mapState,
    mapDispatchToProps
  )(GoogleAutocomplete)
