import React from 'react'
import GoogleAutocomplete1 from './GoogleAutoComplete1'
// import { setLocation } from '../store/user';
import { connect } from 'react-redux' 

class Form extends React.Component
{
 

  onFormSubmit(e) {
    e.preventDefault();
  
		let  location = this.refs.googleAutoComplete.getLocation(); //set variable to location value
    console.log("State is "+this.state.place)
    
    // if (location.length > 0){ //check for input
		// 	this.refs.googleAutoComplete.clearLocation(); //clear location value
		// 	this.props.onSearch(location); //run the parent onSearch function (inside weather.jsx)
		// }
	}
  render()
  {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div>
              <GoogleAutocomplete1
                style={{width: '90%'}}
                ref="googleAutoComplete"
              />
            
        {/* <input type="text" name="city" placeholder="City..." />
        <input type="text" name="country" placeholder="Country..." /> */}
        <button>Get Weather</button>
        </div>
      </form>
    )
  }
}


const mapState = state => ({   })
export default connect(
  mapState,
  null
)(Form)
