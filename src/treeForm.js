import React from "react"
import Map from "./map"
import UploadImage from "./uploadImage"


class TreeForm extends React.Component {
  constructor() {
    super()
    this.state = {
      description: "",
      type: "",

      lat: 47.7511,
      lng: -120.7401,
      zoom: 10
    }
    
    this.handleChange = this.handleChange.bind(this)
  
  }
  
  /*
  const [descrip, setDescrip] = useState("")
  const [type, setType] = useState("")
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState(null)

  const [lat, setLat] = useState("")
  const [lng, setLng] = useState("")
  const [zoom, setZoom] = useState(10)
  const [located, setLocated] = useState(false)
  */




  /*useEffect(() => {
    if (!located) {
      if ("geolocation" in navigator) {
      console.log("Available")
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude)
        console.log("Longitude is :", position.coords.longitude)
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)

        if (lat !== "" && lng !== "") {
          
          setSrcStr("https://www.google.com/maps/embed/v1/view?key=AIzaSyBiB3iNngJM_kFWKxSv9a30O3fww7YTiWA&center=" + lat + "," + lng + "&zoom=18")
          setLocated(true)
          console.log(srcStr)
        }
        

    })
    } else {
      console.log("Not Available")
    }
    }
    

  },)*/
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
        <input type="text" placeholder="Latitude" name="lat" onChange={this.handleChange} value={this.state.lat} />
        <input type="text" placeholder="Longitude" name="lng" onChange={this.handleChange} value={this.state.lng} />
        <Map height="50vh" width="50%" lat={this.state.lat} lng={this.state.lng} zoom={this.state.zoom}/>
        <UploadImage db="publicTrees" username={this.props.username} latitude={this.state.lat} longitude={this.state.lng} type={this.state.type} description={this.state.description} />
        
        

      </div>
    )
    }
    
    


  

    
}

export default TreeForm