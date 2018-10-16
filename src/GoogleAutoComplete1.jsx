import React from 'react'
import { connect } from 'react-redux'
import  {fetchWeather,fetchWeatherBasedOnCity,fetchForecastWeather} from './store/weather';
import  {handleSubmitBasedonCity} from './store/weather';
class GoogleAutocomplete1 extends React.Component
{
 

    componentDidMount() {
        console.log("Inside Component did Mount")
		const { types=['(cities)'] } = this.props;
		// let autocomplete = new window.google.maps.places.Autocomplete(this.refs.location, {
		//   types,
        // });
        console.log("this.refs.location  is "+(this.refs.location.value))
        let autoComplete = new window.google.maps.places.Autocomplete(this.refs.location)
    

        this.props.handleSubmitBasedonCity(this.refs.location.value)
       // console.log("this autocomplete "+JSON.stringify(autocomplete))
        autoComplete.addListener('place_changed', () => {
            let place = autoComplete.getPlace();
            let lat = place.geometry.location.lat();
            let lng = place.geometry.location.lng();
        
            console.log("Latitude  is "+lat)
            this.props.handleSubmit(lat,lng)
    
          });
       // console.log("this autocomplete "+JSON.stringify(this.autocomplete))
	}

	onSelected() {
        // console.log("this autocomplete "+JSON.stringify(this.autocomplete))
        // this.autocomplete.getPlace()
		// if (this.props.onPlaceSelected) {
		// 	this.props.onPlaceSelected(this.autocomplete.getPlace());
        // }
        console.log("value selected is "+this.refs.location)
	}

	getLocation()  {
        console.log("Inside getlocation")
		return this.state.place_formatted;
	}

	clearLocation() {
		this.refs.location.value = '';
	}

	render() {
    let city='New York,NY,USA';
    if(this.props.currentLocation!=null)
    {
    city=this.props.currentLocation.location.city
   
      console.log("City is "+city)
    }
    // this.refs.location.value=city
		return (
			<div>
				<input type="search" className="custom-search-class" defaultValue={city} placeholder="Search weather by city" ref="location"/>
			</div>
		);
	}
}
// const mapDispatch = dispatch => ({
//     loadMatches: id => dispatch(fetchMatches(id)),
//   })
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
         // dispatch(fetchForecastWeatherBasedOnCity(city));
      }
    };
  };
  export default connect(
    mapState,
    mapDispatchToProps
  )(GoogleAutocomplete1)
