import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends React.Component {
  

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '50%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBiB3iNngJM_kFWKxSv9a30O3fww7YTiWA"}}
          center={{lat : this.props.lat, lng : this.props.lng}}
          zoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={this.props.lat}
            lng={this.props.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;