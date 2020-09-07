import React from "react"
import UploadMap from "./uploadMap"


class TreeForm extends React.Component {
  constructor() {
    super()
    this.state = {
      description: "",
      name: "",

      lat: 47.7511,
      lng: -120.7401,
      zoom: 6
    }
    
    this.handleChange = this.handleChange.bind(this)
  
  }
  

componentDidMount() {
  // Get location of user
  const success = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    console.log(latitude, longitude)
    this.setState({
      lat: latitude,
      lng: longitude,
      zoom: 8
    });
  };

  const error = () => {
    console.log("Unable to retrieve your location")
  };

  navigator.geolocation.getCurrentPosition(success, error)
}
    
  

    
  handleChange(event) {

    const {name, value} = event.target

    this.setState({[name]: value})
  }


    render() {

      const namestyle = {
        color: "white",
        backgroundColor: "black",
        padding: "10px",
        height: "10px",
        width: "200px",
        fontFamily: "Arial",
        textAlign: "left"

      }

      const criptstyle = {
        color: "white",
        backgroundColor: "black",
        padding: "10px",
        height: "100px",
        width: "500px",
        fontFamily: "Arial",
        textAlign: "left"

      }

      return (
      <div>
        <h2> Name the tree: </h2>
        <input style={namestyle} type="text" placeholder="Name the tree" name="name" onChange={this.handleChange} value={this.state.name}/>
        <br/>
        <h2> Enter a description: </h2>
        <textarea style={criptstyle} placeholder="Enter a description" name="description" onChange={this.handleChange} value={this.state.description}></textarea>
        <h2> Locate the tree: </h2>
        <UploadMap height="100vh" width="100%" lat={this.state.lat} lng={this.state.lng} zoom={this.state.zoom} username={this.props.username} type={this.state.type} description={this.state.description}/>
      </div>
    )
    }
    
    


  

    
}

export default TreeForm