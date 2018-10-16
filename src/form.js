import React from 'react'
import GoogleAutocomplete from './GoogleAutoComplete'
// import { setLocation } from '../store/user';
import { connect } from 'react-redux'

class Form extends React.Component {
  render() {
    return (
      <form>
        <div>
          <GoogleAutocomplete
            style={{ width: '90%' }}
            ref="googleAutoComplete"
          />
        </div>
      </form>
    )
  }
}

const mapState = state => ({
  currentLocation: state.currentLocation,
})
export default connect(
  mapState,
  null
)(Form)
