import React from 'react'
import GoogleMapReact from 'google-map-react'
import { db } from "../firebase"
import AdoptMarker from "./adoptMarker"

import { Button } from "@material-ui/core"

let isMounted = true

class AdoptMap extends React.Component {

   constructor() {
    super()
    this.state = {
      publicTrees: [],
      lat: 37,
      lng: -95,
      zoom: 1
    }
  }


  componentDidMount() {
    isMounted = true
    db.collection("publicTrees").onSnapshot(snapshot => {
      if(isMounted) {
        this.setState({publicTrees: snapshot.docs.map(doc => doc.data())})
      }
    })

    if ("geolocation" in navigator) {
      console.log("Available")
      navigator.geolocation.getCurrentPosition(position => {
      console.log("Latitude is :", position.coords.latitude)
      console.log("Longitude is :", position.coords.longitude)
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        zoom: 10
      })
      })
    } else {
      console.log("Not Available")
    }

  }

  componentWillUnmount(){
    isMounted = false
  }

  render() {

    var displayTrees = this.state.publicTrees

    return (
      <div>
        <div style={{ height: "100vh",  width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyBiB3iNngJM_kFWKxSv9a30O3fww7YTiWA"}}
            center={{lat : this.state.lat, lng : this.state.lng}}
            zoom={this.state.zoom}
          >
        {displayTrees.length > 0 ? displayTrees.map(tree => {
          return <AdoptMarker key={tree.psudeoId} uid={this.props.uid} lat={tree.latitude} lng={tree.longitude} setPage={this.props.setPage} setViewTree={this.props.setViewTree} tree={tree} />
        }) :  null }
          
          </GoogleMapReact>
        </div>
      </div>
  )
  }
    
    
  
}

export default AdoptMap;