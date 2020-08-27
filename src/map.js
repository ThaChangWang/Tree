import React from 'react';
import GoogleMapReact from 'google-map-react';
import treeImg from "./images/tree.png"

const Marker = () => <div><img src={treeImg} alt="" height="50" width="50" /></div>;

class Map extends React.Component {
  
  Marker = () => <div><img lat={this.props.lat} lng={this.props.lng} src="images/tree.png" alt="" height="200" width="200" /></div>;

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: this.props.height, width: this.props.width }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBiB3iNngJM_kFWKxSv9a30O3fww7YTiWA"}}
          center={{lat : this.props.lat, lng : this.props.lng}}
          zoom={this.props.zoom}
        >
       <Marker
            lat={this.props.lat}
            lng={this.props.lng}

          />
        
          
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;