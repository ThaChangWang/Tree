import React from 'react'
import GoogleMapReact from 'google-map-react'
import { db } from "./firebase"
import AdoptMarker from "./adoptMarker"
import PublicTree from "./publicTree"

import { Button } from "@material-ui/core"



let isMounted = true

class AdoptMap extends React.Component {

   constructor() {
    super()
    this.state = {
      publicTrees: [],
      tree: null

    }
    this.setTree = this.setTree.bind(this)


  }

  setTree(tree) {
    this.setState({
      tree: tree
      })

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


  render() {

    var displayTrees = this.state.publicTrees

    if(this.state.tree) {
        console.log(this.state.tree)
      return (
        <div>
        <PublicTree username={this.props.username} psudeoId={this.state.tree.psudeoId} height="500" width="500" />
        <br/>
        <Button variant="outlined" color="secondary" onClick={() => this.setTree(null)}> Return to Map </Button>
        </div>
      )

    }

    else {
      return (
      // Important! Always set the container height explicitly
      <div style={{ height: this.props.height, width: this.props.width }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBiB3iNngJM_kFWKxSv9a30O3fww7YTiWA"}}
          center={{lat : this.props.lat, lng : this.props.lng}}
          zoom={this.props.zoom}
        >
       {displayTrees.length > 0 ? displayTrees.map(tree => {
        console.log(tree)
        return <AdoptMarker lat={tree.latitude} lng={tree.longitude} key={tree.psudeoId} function={this.setTree} tree={tree} />
      }) :  null }
        
        </GoogleMapReact>
      </div>
    )
    }
    
    
  }
}



export default AdoptMap;