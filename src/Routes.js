import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import App from './App'


class Routes extends Component {
  componentDidMount() {
 
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


export default withRouter(
  connect(
    null,
    null
  )(Routes)
)