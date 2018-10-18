import React, {Component} from 'react'
import {connect} from 'react-redux'
import configureHighcharts from '../utils/highchartsConfig'

const ReactHighstock = require('react-highcharts/ReactHighstock')
var moment = require('moment-timezone');
class Chart extends Component {
  constructor() {
    super()
    this.getData = this.getData.bind(this)
  }

  getData(chartData) {
    var out = []
    console.log("length is "+chartData.length)
    for (let j = 0; j < chartData.length; j++) {
      var tmp = [];
      let date = moment(chartData[j].date).valueOf()

      console.log("this.props.unit is************************************"+this.props.unit)
      let price=0;
      if(this.props.unit=='C')
      {
         price = parseInt(chartData[j].maxtempC)  
      }
      else
      {
         price = parseInt(chartData[j].maxtempF)
      }
    
      tmp.push(date)
      tmp.push(price)
      out[j]=tmp
    }
    //console.log("Out is "+out[0][0])
    return out
  }

  render() {
    
        let chartArr = this.props.historicalData

      
        const series = chartArr.map(chart1 => {
          let out = this.getData(chart1.data.weather)
          console.log("Inside Charts data is "+out+"city is "+JSON.stringify(chart1.data.request[0].query))
          
          return {
            data: out,
            name: chart1.data.request[0].query
          }
        })
   
      const config = configureHighcharts(series)
      if (this.props.historicalData.length !== 0) {
        return <ReactHighstock config={config} ref="chart" />
      } else {
        return <div />
      }
  }
}

const mapStateToProps = state => ({
    historicalData: state.historicalData,
    cities: state.cities,
    unit:state.weather.unit
})

export default connect(mapStateToProps, null)(Chart)
