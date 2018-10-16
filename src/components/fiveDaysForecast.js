import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootswatch/cosmo/bootstrap.css'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { connect } from 'react-redux'

class Fivedays extends React.Component {
  render() {
    const { format } = 'C'
    const { day1, day2, day3, day4, day5 } = this.props.weather.forecast
    let hr = new Date().getHours()
    let tod = hr >= 17 ? 'night' : 'day'
    let d = new Date()
    let date = d.getDate()
    let strDate = date.toString()
    let m = d.getMonth()
    let months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    function daylist(day, num) {
      // console.log("date: ", day, "num: ", num, "date+num: ", day+num);
      if (day + num > 6) {
        num = (day + num) % 7
        // console.log("updated num: ", num);
        return weekday[num]
      }
      return weekday[day + num]
    }
    var n = daylist(date, 0)
    var n2 = daylist(date, 1)
    var n3 = daylist(date, 2)
    var n4 = daylist(date, 3)
    var n5 = daylist(date, 4)

    function dateHandler(date, num) {
      let result = ''
      switch (months[m]) {
        case 'Jan' || 'Mar' || 'May' || 'Jul' || 'Aug' || 'Oct' || 'Dec':
          if (date + num > 31) m++
          break
        case 'Apr' || 'Jun' || 'Sep' || 'Nov':
          if (date + num > 30) m++
          break
        case 'Feb':
          if (date + num > 29) m++
          break
        default:
           break
      }
      let temp = date + num
      strDate = temp.toString()
      if (date + num === 1) strDate = strDate + 'st'
      if (date + num === 2) strDate = strDate + 'nd'
      if (date + num === 3) strDate = strDate + 'rd'
      else strDate = strDate + 'th'
      result = months[m] + ' ' + strDate
      //  console.log("result: ", result);
      return result
    }
    var d1 = dateHandler(date, 1)
    var d2 = dateHandler(date, 2)
    var d3 = dateHandler(date, 3)
    var d4 = dateHandler(date, 4)
    var d5 = dateHandler(date, 5)

    const popoverTop = (
      <Popover id="popover-positioned-top" title={d1}>
        <strong>
          Average: {day1.day}°{format}
        </strong>
        <br />
        High: {day1.max}°{format} Low: {day1.min}°{format}
      </Popover>
    )
    const popoverTop2 = (
      <Popover id="popover-positioned-top" title={d2}>
        <strong>
          Average: {day2.day}°{format}
        </strong>
        <br />
        High: {day2.max}°{format} Low: {day2.min}°{format}
      </Popover>
    )
    const popoverTop3 = (
      <Popover id="popover-positioned-top" title={d3}>
        <strong>
          Average: {day3.day}°{format}
        </strong>
        <br />
        High: {day3.max}°{format} Low: {day3.min}°{format}
      </Popover>
    )
    const popoverTop4 = (
      <Popover id="popover-positioned-top" title={d4}>
        <strong>
          Average: {day4.day}°{format}
        </strong>
        <br />
        High: {day4.max}°{format} Low: {day4.min}°{format}
      </Popover>
    )
    const popoverTop5 = (
      <Popover id="popover-positioned-top" title={d5}>
        <strong>
          Average: {day5.day}°{format}
        </strong>
        <br />
        High: {day5.max}°{format} Low: {day5.min}°{format}
      </Popover>
    )

    return (
      <div className="App-body">
        <OverlayTrigger
          trigger={['hover', 'focus']}
          placement="top"
          overlay={popoverTop}
          // onClick={self.clicked.bind(self, day1.day, 1)}
        >
          <div className="Day-item">
            <div className="Day-text"> {n} </div>
            <i
              id="forecasticon1"
              className={'wi wi-owm-' + tod + '-' + day1.id}
            />
            <div className="Day-temp">
              {' '}
              {day1.day}°{format}
            </div>
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          trigger={['hover', 'focus']}
          placement="top"
          overlay={popoverTop2}
          // onClick={self.clicked.bind(self, day2.day, 2)}
        >
          <div className="Day-item">
            <div className="Day-text"> {n2} </div>
            <i
              id="forecasticon2"
              className={'wi wi-owm-' + tod + '-' + day2.id}
            />
            <div className="Day-temp">
              {' '}
              {day2.day}°{format}
            </div>
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          trigger={['hover', 'focus']}
          placement="top"
          overlay={popoverTop3}
          // onClick={self.clicked.bind(self, day3.day, 3)}
        >
          <div className="Day-item">
            <div className="Day-text"> {n3} </div>
            <i
              id="forecasticon3"
              className={'wi wi-owm-' + tod + '-' + day3.id}
            />
            <div className="Day-temp">
              {' '}
              {day3.day}°{format}
            </div>
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          trigger={['hover', 'focus']}
          placement="top"
          overlay={popoverTop4}
          // onClick={self.clicked.bind(self, day4.day, 4)}
        >
          <div className="Day-item">
            <div className="Day-text"> {n4} </div>
            <i
              id="forecasticon4"
              className={'wi wi-owm-' + tod + '-' + day4.id}
            />
            <div className="Day-temp">
              {' '}
              {day4.day}°{format}
            </div>
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          trigger={['hover', 'focus']}
          placement="top"
          overlay={popoverTop5}
          // onClick={self.clicked.bind(self, day5.day, 5)}
        >
          <div className="Day-item">
            <div className="Day-text"> {n5} </div>
            <i
              id="forecasticon5"
              className={'wi wi-owm-' + tod + '-' + day5.id}
            />
            <div className="Day-temp">
              {' '}
              {day5.day}°{format}
            </div>
          </div>
        </OverlayTrigger>
      </div>
    )
  }
}
const mapState = state => ({
  weather: state.weather,
  // loc:state.currentLocation.location.loc
})
export default connect(
  mapState,
  null
)(Fivedays)
