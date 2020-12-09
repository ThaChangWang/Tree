import React from "react"
import FullTreePage from "./fullTreePage"
import { db } from "../firebase"

import { Button, Typography } from "@material-ui/core"


let isMounted = false

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
    isMounted = true
    db.collection("publicTrees").onSnapshot(snapshot => {
      let thisTree = null

      snapshot.docs.forEach(doc => {
        if(doc.data().psudeoId === this.props.psudeoId) {
          thisTree = doc.data()
        }
      })
      
      if (isMounted) {
        this.setState({
          tree: thisTree
      })
      }
      
    })
  }

  componentWillUnmount(){
    isMounted = false
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
        backgroundColor: "#90EE90",
        textAlign: "left",
        paddingLeft: "10px",
        paddingRight: "10px",
        border: "4px solid brown"

      }

      if (this.state.fullPage) {
        return (
          <div style={treestyle}>
            <FullTreePage uid={this.props.uid} username={this.props.username} tree={this.state.tree}/>
            <hr/>
            <Button variant="outlined" color="secondary" onClick={() => this.setState({fullPage: false})}> Close Posts </Button>
          </div>
        )

      }

      else {

        let tree = this.state.tree

        if(tree) {

          if (this.props.username) {

            let date = ""
            let time = ""
            
            if (tree.timestamp) {
              date = tree.timestamp.toDate().toLocaleDateString()
              time = tree.timestamp.toDate().toLocaleTimeString()
            } 

            return (
              <div style={treestyle}>
                <Typography variant="h2" color="secondary"> {tree.name} </Typography>
                <Button variant="outlined" color="secondary" onClick={() => this.setState({fullPage: true})}> View Posts </Button>
                
                {tree.owner ? 
                  null :
                  <Button variant="outlined" color="secondary" onClick={() => this.updateOwner(this.props.uid)}> Adopt Tree </Button>}

                {tree.owner === this.props.uid ? 
                  <Button variant="outlined" color="secondary" onClick={() => this.updateOwner(null)}> Release from Care </Button> :
                  null}

                <div>
                <br/>
                <img src={tree.imageUrl} alt="" width="100%" />
                <Typography variant="h4" color="secondary"> {tree.description} </Typography>
                </div>

                <Typography variant="h5" color="secondary"> Posted by: {tree.postedBy} </Typography>
                <Typography variant="h5" color="secondary" align="right"> {date + " " + time} </Typography>
              </div>
          
        )

          }

          else {

            return (
              <div style={treestyle}>
                <hr/>
                <Typography variant="h2" color="secondary">{tree.name}</Typography>
                <Button variant="outlined" color="secondary" onClick={() => this.setState({fullPage: true})}> View Full Page </Button>
                
                <div>
                <br/>
                <img src={tree.imageUrl} alt="" width="100%" />
                <Typography variant="h4" color="secondary"> {tree.description} </Typography>
                </div>

                <Typography variant="h5" color="secondary"> Posted by: {tree.postedBy} </Typography>
                <Typography variant="h5" color="secondary"> {tree.time} </Typography>
                <hr/>
              </div>
          
        )

          }

          
          
        }

        else{

          return (
            <Typography variant="h3" color="secondary"> Loading Tree... If you are able to read through this entire message then something went wrong </Typography>
          )
          
        }

        
      }

      
    
  }
}

export default PublicTree