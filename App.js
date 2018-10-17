// import React from 'react'
// import Weather from './weather'
// import Form from './form'
// import Fivedays from './fiveDaysForecast'
// import { getCurrentLocation } from '../store/currentLocation'
// import { getHistoricalWeatherData } from '../store/historicalData'
// import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
// import Chart from './charts'
// import {addStock, removeStock} from '../store/cities'


// class App extends React.Component {

//   constructor() {
//     super()
//     this.state = {
//       cities: ['NEW YORK,NY', 'LONDON,UK','New Orleans, LA.']
//     }
//     //this.handleRemoveClick = this.handleRemoveClick.bind(this)
//   }

//    componentDidMount() {
//      this.props.addStock(this.state.cities)
//      this.props.loadInitialData(this.state.cities)
//   }
  

//   render() {
//     return (
//       <div>
//         <div className="wrapper">
//           <div className="">
//             <div className="">
//               <div className="">
//                 {/* <div className="col-xs-5 title-container">
//                   <Titles />
//                 </div> */}
//                 <div className="">
//                   <Form loadWeather={this.getWeather} />
//                   <Weather />
//                   {/* <Fivedays /> */}
//                   <Chart/>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
// const mapDispatch = dispatch => {
//   return {
//     loadInitialData(cities) {
      
//       dispatch(getCurrentLocation())
//       dispatch(getHistoricalWeatherData(cities))
//     },
//     addStock: symbol => dispatch(addStock(symbol)),
//     removeStock: code => dispatch(removeStock(code))
//   }
// }
// const mapState = state => {
//   return {
//     location: state.currentLocation.location,
//     cities:state.cities
//   }
// }

// export default withRouter(
//   connect(
//     mapState,
//     mapDispatch
//   )(App)
// )
