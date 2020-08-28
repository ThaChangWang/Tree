import React from "react"
import UploadMap from "./uploadMap"


class TreeForm extends React.Component {
  constructor() {
    super()
    this.state = {
      description: "",
      type: "",

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
      zoom: 15
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

      

      return (
      <div>
        <h2>Upload a Public Tree</h2>
        <br/>
        <input type="text" placeholder="Enter the tree classification.." name="type" onChange={this.handleChange} value={this.state.type} />
        <br/>
        <input type="text" placeholder="Enter a description" name="description" onChange={this.handleChange} value={this.state.description} />
        <br/>
        <UploadMap height="50vh" width="50%" lat={this.state.lat} lng={this.state.lng} zoom={this.state.zoom} db="publicTrees" username={this.props.username} type={this.state.type} description={this.state.description}/>
        
        
        

      </div>
    )
    }
    
    


  

    
}

export default TreeForm