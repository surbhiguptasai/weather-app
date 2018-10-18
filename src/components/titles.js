import React from 'react'
class Titles extends React.Component {
  render() {
    return (
      <div className="title-center">
        <h1 className="title-container__title">Weather Scanner </h1>
        <h2 className="title-container__subtitle">
          {' '}
          Helps you find weather conditions in cities...{' '}
        </h2>
      </div>
    )
  }
}
export default Titles
