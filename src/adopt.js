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
        <h2> Adopt a Tree </h2>
        {displayTrees.length > 0 ? displayTrees.map(tree => {
        return <PublicTree key={tree.key} type={tree.props.type} imageUrl={tree.imageUrl} lat={tree.props.latitude} lng={tree.props.longitude} description={tree.props.description} username={tree.props.username}/>
      }) : <h1>hey</h1> }
        
      </div>
    )
  }
}

export default Adopt