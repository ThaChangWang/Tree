import React from "react"
import FullTreePage from "./fullTreePage"
import { db } from "./firebase"


class PublicTree extends React.Component {
  constructor() {
    super()
    this.state = {
      fullPage: false
    }
    this.updateOwner = this.updateOwner.bind(this)
    
  }

updateOwner = (owner) => {
  db.collection("publicTrees").where("psudeoId", "==", this.props.tree.psudeoId)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data())
            db.collection("publicTrees").doc(doc.id).update({
              props: {
                db: doc.data().props.db,
                description: doc.data().props.description,
                latitude: doc.data().props.latitude,
                longitude: doc.data().props.longitude,
                name: doc.data().props.name,
                owner: owner,
                postedBy: doc.data().props.postedBy
              }
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
          <FullTreePage username={this.props.username} tree={this.props.tree}/>
        )

      }

      else {
        return (
          <div style={treestyle}>
            <h2>{this.props.tree.props.name}</h2>
            <br/>
              <button onClick={() => this.setState({fullPage: true})}> View Full Page </button>
              {this.props.tree.props.owner ? 
                null :
                <button onClick={() => this.updateOwner(this.props.username)}> Adopt Tree </button>}
              {this.props.tree.props.owner === this.props.username ? 
                <button onClick={() => this.updateOwner(null)}> Release from Care </button> :
                null}    

                <div>
                <img src={this.props.tree.imageUrl} alt="" height={this.props.height} width={this.props.width} />
                <h3> {this.props.tree.props.description} </h3>
                </div>
              <h4> Posted by: {this.props.tree.props.postedBy} </h4>
          </div>
        )
      }

      
    
  }
}

export default PublicTree