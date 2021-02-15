import React from "react"
import FullTreePage from "./fullTreePage"
import ProfileLink from "./profileLink"
import { db } from "../firebase"

import { Button, Typography } from "@material-ui/core"


let isMounted = false

class PublicTree extends React.Component {
  constructor() {
    super()
    this.state = {
      fullPage: false,
      tree: null,
      treeId: null
    }
    this.updateOwner = this.updateOwner.bind(this)
    
  }

  componentDidMount() {
    isMounted = true
    db.collection("publicTrees").onSnapshot(snapshot => {
      let thisTree = null
      let thisId = null

      snapshot.docs.forEach(doc => {
        if(doc.data().psudeoId === this.props.psudeoId) {
          thisTree = doc.data()
          thisId = doc.id
        }
      })
      
      if (isMounted) {
        this.setState({
          tree: thisTree,
          treeId: thisId
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
      backgroundColor: "#FFFFF0",
      borderRadius: "15px",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      paddingLeft: "10px",
      paddingRight: "10px",
      marginLeft: "10px",
      marginRight: "10px"
      }

        if(this.state.tree) {

        let tree = this.state.tree

         console.log(this.state.tree.owner)

            let date = ""
            let time = ""
            
            if (tree.timestamp) {
              date = tree.timestamp.toDate().toLocaleDateString()
              time = tree.timestamp.toDate().toLocaleTimeString()
            } 

            return (
              <div style={treestyle}>
                <Typography variant="h2" color="secondary"> {tree.name} </Typography>
                <br />
                
                {tree.owner ? 
                  null :
                  <Button variant="outlined" color="secondary" onClick={() => this.updateOwner(this.props.uid)}> Adopt Tree </Button>}

                {tree.owner === this.props.uid ? 
                  <Button variant="outlined" color="secondary" onClick={() => this.updateOwner(null)}> Release from Care </Button> :
                  null}

                <div>
                <br/>
                <img src={tree.imageUrl} alt="" style={{ borderRadius: "15px" }} width="100%" />
                </div>

                <br />

                {tree.owner ? 
                <ProfileLink setPage={this.props.setPage} setViewProfile={this.props.setViewProfile} ownerId={tree.owner}/> :
                null
                }
                
                <Typography variant="h5" color="secondary" align="right"> {date + " " + time} </Typography>
                {this.state.fullPage ? 
                <Button variant="outlined" color="secondary" onClick={() => this.setState({fullPage: false})}> Close Posts </Button> :
                <Button variant="outlined" color="secondary" onClick={() => this.setState({fullPage: true})}> View Posts </Button>
                }
                
                <br />
                <br />

                {this.state.fullPage ? 
                [<FullTreePage uid={this.props.uid} treeId={this.state.treeId} username={this.props.username} tree={this.state.tree} main={this.props.main}/>,
                <br />,
                <Button variant="outlined" color="secondary" onClick={() => this.setState({fullPage: false})}> Close Posts </Button>,
                <br />,
                <br />] :
                null}
              </div>
          
        )
        }

        else{

          return (
            <Typography variant="h3" color="secondary"> Loading... </Typography>
          )
          
        }
    
  }
}

export default PublicTree