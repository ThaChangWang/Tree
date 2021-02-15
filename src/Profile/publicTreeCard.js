import React from "react"
import FullTreePage from "./fullTreePage"
import ProfileLink from "./profileLink"
import { db } from "../firebase"

import { Button, Typography, Avatar, Grid } from "@material-ui/core"


let isMounted = false

class PublicTreeCard extends React.Component {
  constructor() {
    super()
    this.state = {
      fullPage: false,
      tree: null,
      treeId: null
    }    
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
                 <Grid container spacing={4}>
                    <Grid item sm={12} md={8}>
                      <Typography variant="h2" color="secondary"> {tree.name} </Typography>
                    </Grid>
                    <Grid item sm={12} md={4}>
                      <Avatar src={tree.imageUrl} alt="" style={{ height: '400px', width: '400px', float:"right" }} />
                    </Grid>
                  </Grid>
                
                <br />


                
                <br />
                
                <Typography variant="h5" color="secondary" align="right"> {date + " " + time} </Typography>
                {this.state.fullPage ? 
                <Button variant="outlined" color="secondary" onClick={() => this.setState({fullPage: false})}> Close Posts </Button> :
                <Button variant="outlined" color="secondary" onClick={() => this.setState({fullPage: true})}> View Posts </Button>
                }
                
                <br />
                <br />

                {this.state.fullPage ? 
                [<FullTreePage uid={this.props.uid} treeId={this.state.treeId} username={this.props.username} tree={this.state.tree} main={this.props.main}/>,
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

export default PublicTreeCard