import React from "react"
import FullTreePage from "./fullTreePage"
import { db } from "./firebase"

import { Button, Typography } from "@material-ui/core"


class PublicTree extends React.Component {
  constructor() {
    super()
    this.state = {
      fullPage: false,
      tree: null
    }
    this.updateOwner = this.updateOwner.bind(this)
    
  }

  componentDidMount() {
    db.collection("publicTrees").onSnapshot(snapshot => {
      let thisTree = null

      snapshot.docs.forEach(doc => {
        if(doc.data().psudeoId === this.props.psudeoId) {
          thisTree = doc.data()
        }
      })

      this.setState({
        tree: thisTree
      })
    })
  }

  updateOwner = (owner) => {
    db.collection("publicTrees").where("psudeoId", "==", this.props.psudeoId)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              db.collection("publicTrees").doc(doc.id).update({
                owner: owner,
              })
          })
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error)
      })

  }



  render() {

    const treestyle = {
        color: "white",
        backgroundColor: "#7FFFD4",
        padding: "10px",
        fontFamily: "Arial",
        textAlign: "left",
        display: "contain"

      }

      if (this.state.fullPage) {
        return (
          <div>
            <FullTreePage username={this.props.username} tree={this.state.tree}/>
            <Button onClick={() => this.setState({fullPage: false})}> Close Full Page </Button>
          </div>
        )

      }

      else {

        let tree = this.state.tree

        if(tree) {

          return (
          <div style={treestyle}>
            <hr/>
            <Typography variant="h2" color="secondary">{tree.name}</Typography>
            <Button variant="outlined" color="secondary" onClick={() => this.setState({fullPage: true})}> View Full Page </Button>
            {tree.owner ? 
              null :
              <Button variant="outlined" color="secondary" onClick={() => this.updateOwner(this.props.username)}> Adopt Tree </Button>}
            {tree.owner === this.props.username ? 
              <Button variant="outlined" color="secondary" onClick={() => this.updateOwner(null)}> Release from Care </Button> :
              null}

            <div>
            <br/>
            <img src={tree.imageUrl} alt="" height={this.props.height} width={this.props.width} />
            <Typography variant="h4" color="secondary"> {tree.description} </Typography>
            </div>

            <Typography variant="h5" color="secondary"> Posted by: {tree.postedBy} </Typography>
            <hr/>
          </div>
          
        )
          
        }

        else{

          return (
            <h4> Loading Tree... </h4>
          )
          
        }

        
      }

      
    
  }
}

export default PublicTree