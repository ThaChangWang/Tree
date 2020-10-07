import React from "react"
import PublicTree from "./publicTree"
import { db } from "../firebase"


class MyTrees extends React.Component {
  constructor() {
    super()
    this.state = {
      myTrees: []
    }
  }

  componentDidMount() {
    db.collection("publicTrees").where("owner", "==", this.props.username)
    .get()
    .then((querySnapshot) => {
        let myTrees = []
        querySnapshot.forEach((doc) => {
            //console.log(doc.id, " => ", doc.data())
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
          return <PublicTree key={tree.psudeoId} username={this.props.username} psudeoId={tree.psudeoId} height="300" width="300" />
        }) :
        <h2> No Trees </h2>}
      </div>
    )
}
  
}

export default MyTrees