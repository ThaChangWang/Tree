import React from 'react';
import GoogleMapReact from 'google-map-react';
import UploadTree from "./uploadTree"
import UploadMarker from "./uploadMarker"
import { db } from "../firebase"
import treeImg from "../images/tree.png"

const Marker = () => <div><img src={treeImg} alt="" height="50" width="50" /></div>;

let isMounted = false

class UploadMap extends React.Component {
  
   constructor() {
    super()
    this.state = {
      publicTrees: [],
      lat: 0,
      lng: 0
    }
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount() {
    isMounted = true
    db.collection("publicTrees").onSnapshot(snapshot => {
      if(isMounted) {
        console.log(snapshot.docs.map(doc => doc.data()))
        this.setState({publicTrees: snapshot.docs.map(doc => doc.data())})
      }
    })
    
  }

  componentWillUnmount(){
    isMounted = false
  }

  onClick(event) {
    this.setState({
      lat: event.lat,
      lng: event.lng
    })
  }


  render() {

    var displayTrees = this.state.publicTrees

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: this.props.height, width: this.props.width }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBiB3iNngJM_kFWKxSv9a30O3fww7YTiWA"}}
          center={{lat : this.props.lat, lng : this.props.lng}}
          zoom={this.props.zoom}
          onClick={this.onClick}
        >

      {displayTrees.length > 0 ? displayTrees.map(tree => {
        return <UploadMarker key={tree.psudeoId} lat={tree.latitude} lng={tree.longitude} imageUrl={tree.imageUrl} />
      }) :  null }

       <Marker
            lat={this.state.lat}
            lng={this.state.lng}
          />

        
          
        </GoogleMapReact>
        <h2> Choose an image and upload: </h2>
        <UploadTree postedBy={this.props.username} owner={null} latitude={this.state.lat} longitude={this.state.lng} uid={this.props.uid} name={this.props.name} description={this.props.description} />
        <br/>
      </div>
    );
  }
}

export default UploadMap;