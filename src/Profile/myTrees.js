import React from "react"
import PublicTreeCard from "./publicTreeCard"
import { db } from "../firebase"

class MyTrees extends React.Component {
  constructor() {
    super()
    this.state = {
      myTrees: []
    }
  }

  componentDidMount() {
    db.collection("publicTrees").where("owner", "==", this.props.suid)
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
            <PublicTreeCard uid={this.props.uid} key={tree.psudeoId} username={this.props.username} psudeoId={tree.psudeoId} />
            <br/>
            <br/>
          </div>
          )
          
        }) :
        null}
      </div>
    )
}
  
}

export default MyTrees