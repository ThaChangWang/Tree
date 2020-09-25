import React from "react"
import FullTreePage from "./fullTreePage"
import { db } from "./firebase"


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
        color: "white",
        backgroundColor: "black",
        padding: "10px",
        fontFamily: "Arial",
        textAlign: "left",
        display: "contain"

      }

      if (this.state.fullPage) {
        return (
          <div>
            <FullTreePage username={this.props.username} tree={this.state.tree}/>
            <button onClick={() => this.setState({fullPage: false})}> Close Full Page </button>
          </div>
        )

      }

      else {

        let tree = this.state.tree

        if(tree) {

          return (
          <div>
            <h2>{tree.name}</h2>
            <button onClick={() => this.setState({fullPage: true})}> View Full Page </button>
            {tree.owner ? 
              null :
              <button onClick={() => this.updateOwner(this.props.username)}> Adopt Tree </button>}
            {tree.owner === this.props.username ? 
              <button onClick={() => this.updateOwner(null)}> Release from Care </button> :
              null}    

            <div style={treestyle}>
              <img src={tree.imageUrl} alt="" height={this.props.height} width={this.props.width} />
              <h3> {tree.description} </h3>
            </div>
            <h4> Posted by: {tree.postedBy} </h4>
          </div>
        )
          
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