import React from 'react';
import GoogleMapReact from 'google-map-react';
import { db } from "./firebase"

import treeImg from "./images/tree.png"


const Marker = ({ imageUrl, height, width }) => <div><img src={imageUrl} alt="" height={height} width={width} /></div>;

let isMounted = true

class AdoptMap extends React.Component {

   constructor() {
    super()
    this.state = {
      publicTrees: []
    }
    this.onClick = this.onClick.bind(this)
  }


  componentDidMount() {
    isMounted = true
    db.collection("publicTrees").onSnapshot(snapshot => {
      if(isMounted) {
        this.setState({publicTrees: snapshot.docs.map(doc => doc.data())})
      }
    })
    
  }

  componentWillUnmount(){
    isMounted = false
  }

  onClick(event) {
    console.log(event)

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
        console.log(tree)
        return <Marker key={tree.timestamp} lat={tree.props.latitude} lng={tree.props.longitude} imageUrl={tree.imageUrl} height={5 * this.props.zoom} width={5 * this.props.zoom} />
      }) : <Marker key={"nil"} lat={47.7511} lng={-120.7401} imageUrl={treeImg} height={50} width={50} /> }
        
          
        </GoogleMapReact>
      </div>
    );
  }
}

export default AdoptMap;