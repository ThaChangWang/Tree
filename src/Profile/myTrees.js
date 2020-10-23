import React from "react"
import PublicTree from "./publicTree"
import { db } from "../firebase"

import { Typography } from '@material-ui/core'



class MyTrees extends React.Component {
  constructor() {
    super()
    this.state = {
      myTrees: []
    }
  }

  componentDidMount() {
    db.collection("publicTrees").where("owner", "==", this.props.uid)
    .get()
    .then((querySnapshot) => {
        let myTrees = []
        querySnapshot.forEach((doc) => {
            myTrees.push(doc.data())
        })
        this.setState({
              myTrees: myTrees
            })

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error)
    })
  }


  render() {

    let myTrees = this.state.myTrees

       return (
      <div>
        {myTrees.length > 0 ? myTrees.map(tree => {
          return (
            <div key={tree.psudeoId}>
            <PublicTree uid={this.props.uid} key={tree.psudeoId} username={this.props.username} psudeoId={tree.psudeoId} height="300" width="300" />,
            <hr/>
          </div>
          )
          
        }) :
        <Typography variant="h5" color="secondary"> No Trees </Typography>}
      </div>
    )
}
  
}

export default MyTrees