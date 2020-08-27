import React from "react"
import Map from "./map"

class PublicTree extends React.Component {
  constructor() {
    super()
    this.state = {}
    
  }


  render() {
    return (
      <div>
          <h4>{this.props.type}</h4>
          <br/>
          <img src={this.props.imageUrl} alt="" height="200" width="200" />
          <Map height="20vh" width="20%" lat={this.props.lat} lng={this.props.lng} zoom={10} />
          <br/>
          <h4>Posted by {this.props.username}</h4>
          <br/>
          <h4> {this.props.description} </h4>
      </div>
    )
  }
}

export default PublicTree