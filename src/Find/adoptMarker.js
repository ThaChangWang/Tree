import React from "react"

class AdoptMarker extends React.Component {

  render() {

    let adoptstyle

    if (this.props.tree.owner === this.props.uid) {
      adoptstyle = {
        color: "white",
        backgroundColor: "blue",
        textAlign: "center"
      }
    }
      
    else if (this.props.tree.owner) {
      adoptstyle = {
        color: "white",
        backgroundColor: "green",
        textAlign: "center"
      }
    }
    else {
      adoptstyle = {
        color: "brown",
        backgroundColor: "yellow",
        textAlign: "center"
      }
    }

    return (
      <div>
        <img src={this.props.tree.imageUrl} alt="" height="50" width="50" />
        <button style={adoptstyle} onClick={() => this.props.function(this.props.tree)}> View Tree </button>
      </div>
    )
    
    
  }
}

export default AdoptMarker
