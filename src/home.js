import React from "react"


class Home extends React.Component {
  constructor() {
    super()
    this.state = {}
  }


  render() {

    const mystyle = {
      color: "white",
      backgroundColor: "green",
      padding: "10px",
      fontFamily: "Arial",
      textAlign: "center"
    }

    return (
      <div>
        <h1 style={mystyle}>Treebook</h1>


      </div>
    )
  }
}

export default Home