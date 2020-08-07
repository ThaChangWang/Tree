import React from "react"


class Home extends React.Component {
  constructor() {
    super()
    this.state = {}
  }


  render() {

    const mystyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial",
      textAlign: "center"
    }

    return (
      <div>
        <h1 style={mystyle}>Anders Bergquist</h1>


      </div>
    )
  }
}

export default Home