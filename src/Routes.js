import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import {getCurrentLocation} from './store'


class Routes extends Component {
  componentDidMount() {
    console.log("Loading Initial Data *****************")
  this.props.loadInitialData()
  }

  render() {
  
    return (
      <div>
        <Switch>
          <Route  path="/" component={App} />
          <Route component={App} />
          
        </Switch>
      </div>
    )
  }
}
const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(getCurrentLocation())
    }
  }
}
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    location: state.location
  }
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
)