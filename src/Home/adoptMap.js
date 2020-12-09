import React from 'react'
import GoogleMapReact from 'google-map-react'
import { db } from "../firebase"
import AdoptMarker from "./adoptMarker"
import PublicTree from "../Profile/publicTree"

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
      return (
        <div>
          <PublicTree uid={this.props.uid} username={this.props.username} psudeoId={this.state.tree.psudeoId} width="500" />
          <br/>
          <Button variant="outlined" color="secondary" onClick={() => this.setTree(null)}> Return to Map </Button>
        </div>
      )

    }

    else {

      return (
        <div>
          <div style={{ height: "100vh",  width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyBiB3iNngJM_kFWKxSv9a30O3fww7YTiWA"}}
              center={{lat : 48.0401, lng : -122.4063}}
              zoom={10}
            >
          {displayTrees.length > 0 ? displayTrees.map(tree => {
            return <AdoptMarker key={tree.psudeoId} uid={this.props.uid} lat={tree.latitude} lng={tree.longitude} function={this.setTree} tree={tree} />
          }) :  null }
            
            </GoogleMapReact>
          </div>
        </div>
    )
    }
    
    
  }
}

export default AdoptMap;