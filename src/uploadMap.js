import React from 'react';
import GoogleMapReact from 'google-map-react';
import UploadImage from "./uploadImage"
import treeImg from "./images/tree.png"

const Marker = () => <div><img src={treeImg} alt="" height="50" width="50" /></div>;

class UploadMap extends React.Component {
  
   constructor() {
    super()
    this.state = {
      lat: 0,
      lng: 0
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick(event) {
    this.setState({
      lat: event.lat,
      lng: event.lng
    })


  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: this.props.height, width: this.props.width }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBiB3iNngJM_kFWKxSv9a30O3fww7YTiWA"}}
          center={{lat : this.props.lat, lng : this.props.lng}}
          zoom={this.props.zoom}
          onClick={this.onClick}
        >
       <Marker
            lat={this.state.lat}
            lng={this.state.lng}

          />
        
          
        </GoogleMapReact>
        <UploadImage db="publicTrees" username={this.props.username} latitude={this.state.lat} longitude={this.state.lng} type={this.props.type} description={this.props.description} />
      </div>
    );
  }
}

export default UploadMap;