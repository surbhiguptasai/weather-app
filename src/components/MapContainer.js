import React from "react"
import { connect } from 'react-redux'


import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";
 
class MapContainer extends React.Component {

       render(){
      if (
        this.props.location !== undefined &&
        this.props.location !== null &&
        this.props.location !== null 
      )
      {


          let MapWithAMarker = withScriptjs(withGoogleMap(props =>
   
            <GoogleMap
              defaultZoom={8}
              defaultCenter={{ lat: this.props.latitude, lng: this.props.longitude }}
            >
              <Marker
                position={{ lat: this.props.latitude, lng: this.props.longitude }}
              />
            </GoogleMap>
  
          ));
        return(
            <MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB4Aw7HKY9FKq_-J6_3FY13SNUBfCMsaaM&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `455px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        )
        }
                 else {
return (<div> Loading maps </div>)
      }
}
}

  const mapState = state => ({location: state.weather.location,
  latitude: state.weather.latitude,
  longitude: state.weather.longitude  })

  export default connect(
    mapState,
    null
  )(MapContainer)