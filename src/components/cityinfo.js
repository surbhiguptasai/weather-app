import React, {Component} from 'react'

class CityInfo extends Component {
  render() {
    let city = this.props.city
    return (
      <div className="stock col-sm-4 w3-card w3-light-grey">
        <p className="stock-code">
          {/* <span>{city}</span> */}
          <span className="float-sm-right" onClick={this.props.onClick}>
            <i className="fa fa-times" />
          </span>
        </p>
        <p>{city}</p>
      </div>
    )
  }
}

export default CityInfo