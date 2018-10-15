import React from 'react'
import { connect } from 'react-redux'
import  {fetchWeather} from './store/weather';
class GoogleAutocomplete1 extends React.Component
{
 

    componentDidMount() {
        console.log("Inside Component did Mount")
		const { types=['(cities)'] } = this.props;
		// let autocomplete = new window.google.maps.places.Autocomplete(this.refs.location, {
		//   types,
        // });
        let autoComplete = new window.google.maps.places.Autocomplete(this.refs.location);
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
		return (
			<div>
				<input type="search" className="custom-search-class" placeholder="Search weather by city" ref="location"/>
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
      }
    };
  };
  export default connect(
    mapState,
    mapDispatchToProps
  )(GoogleAutocomplete1)
