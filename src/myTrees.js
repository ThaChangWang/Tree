import React from "react"
import PublicTree from "./publicTree"
import { db } from "./firebase"


class MyTrees extends React.Component {
  constructor() {
    super()
    this.state = {
      myTrees: null
    }
  }

  componentDidMount() {
    db.collection("publicTrees").where("props.username", "==", this.props.username)
    .get()
    .then((querySnapshot) => {
        let myTrees = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data())
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

    if (this.state.myTrees) {
       return (
      <div>
        {myTrees.map(tree => {
          return <PublicTree tree={tree} height="200" width="200" />
        })}
      </div>
    )
    }

    else {
      return (
      <div>
        <h2> No trees </h2>
      </div>
    )
    }
    
  }
}

export default MyTrees