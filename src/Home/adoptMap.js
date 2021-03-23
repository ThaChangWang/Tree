import React from 'react'
import GoogleMapReact from 'google-map-react'
import { db } from "../firebase"
import AdoptMarker from "./adoptMarker"


import { Avatar } from "@material-ui/core"

import curLoc from "../images/curLoc.png"

let isMounted = true

class AdoptMap extends React.Component {

   constructor() {
    super()
    this.state = {
      publicTrees: [],
      lat: 37,
      lng: -95,
      zoom: 1,
      currentLoc: {
        found: false,
        lat: 37,
        lng: -95
      }

    }
  }


  componentDidMount() {
    isMounted = true
    db.collection("publicTrees").onSnapshot(snapshot => {
    if(isMounted) {
      console.log("here")

      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords)
        this.setState({
          publicTrees: snapshot.docs.map(doc => doc.data()),
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          zoom: 10,
          currentLoc: {
            found: true,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        })
      })

      this.setState({
        publicTrees: snapshot.docs.map(doc => doc.data())
      })

    }
    })

  }

  componentWillUnmount(){
    isMounted = false
  }

  render() {

    var displayTrees = this.state.publicTrees
    var width = this.state.zoom * 4

    return (
      <div>
        <div style={{ height: "100vh",  width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyBiB3iNngJM_kFWKxSv9a30O3fww7YTiWA"}}
            center={{lat: this.state.currentLoc.lat, lng: this.state.currentLoc.lng}}
            zoom={this.state.zoom}
            onChange={({ zoom }) => {
              this.setState({
                zoom: zoom
              })
            }
            }
          >

          

        {displayTrees.length > 0 ? displayTrees.map(tree => {
          return <AdoptMarker key={tree.psudeoId} width={width} uid={this.props.uid} lat={tree.latitude} lng={tree.longitude} setPage={this.props.setPage} setViewTree={this.props.setViewTree} tree={tree} />
        }) :  null }

        {this.state.currentLoc.found ?
          <Avatar src={curLoc} alt="" lat={this.state.lat} lng={this.state.lng} style={{ width: width/2, height: width/2 }} /> :
          null
          }

          
          
          </GoogleMapReact>
        </div>
      </div>
  )
  }
    
    
  
}

export default AdoptMap;