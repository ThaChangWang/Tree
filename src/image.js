import React from "react"

class Image extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: ""
    }
  }


  render() {
    return (
      <div>
        <img src={this.props.imgName} alt="face"/>
      </div>
    )
  }
}

export default Image