import React from "react"
import FullTreePage from "./fullTreePage"
import { db } from "../firebase"

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
        backgroundColor: "#90EE90",
        textAlign: "left",
        paddingLeft: "20px"

      }

      if (this.state.fullPage) {
        return (
          <div>
            <FullTreePage uid={this.props.uid} username={this.props.username} tree={this.state.tree}/>
            <Button onClick={() => this.setState({fullPage: false})}> Close Full Page </Button>
          </div>
        )

      }

      else {

        let tree = this.state.tree

        if(tree) {

          if (this.props.username) {

            return (
              <div style={treestyle}>
                <Typography variant="h2" color="secondary">{tree.name}</Typography>
                <Button variant="outlined" color="secondary" onClick={() => this.setState({fullPage: true})}> View Full Page </Button>
                
                {tree.owner ? 
                  null :
                  <Button variant="outlined" color="secondary" onClick={() => this.updateOwner(this.props.uid)}> Adopt Tree </Button>}

                {tree.owner === this.props.uid ? 
                  <Button variant="outlined" color="secondary" onClick={() => this.updateOwner(null)}> Release from Care </Button> :
                  null}

                <div>
                <br/>
                <img src={tree.imageUrl} alt="" height={this.props.height} width={this.props.width} />
                <Typography variant="h4" color="secondary"> {tree.description} </Typography>
                </div>

                <Typography variant="h5" color="secondary"> Posted by: {tree.postedBy} </Typography>
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
                <img src={tree.imageUrl} alt="" height={this.props.height} width={this.props.width} />
                <Typography variant="h4" color="secondary"> {tree.description} </Typography>
                </div>

                <Typography variant="h5" color="secondary"> Posted by: {tree.postedBy} </Typography>
                <hr/>
              </div>
          
        )

          }

          
          
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