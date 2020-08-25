import React from "react"
import PublicTree from "./publicTree"

import { db } from "./firebase"

class Adopt extends React.Component {
  constructor() {
    super()
    this.state = {
      publicTrees: []
    }
  }

  componentDidMount() {
    db.collection("publicTrees").onSnapshot(snapshot => {
      this.setState({publicTrees: snapshot.docs.map(doc => doc.data())})
    })
    
  }



  render() {

    var displayTrees = this.state.publicTrees


    return (
      <div>
        {displayTrees.length > 0 ? displayTrees.map(tree => {
        return <PublicTree key="public-tree" type={tree.type} imageUrl={tree.imageUrl} owner={tree.owner} description={tree.description} username={tree.username}/>
      }) : <h1>hey</h1> }
        
      </div>
    )
  }
}

export default Adopt