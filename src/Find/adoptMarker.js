import React from "react"





class AdoptMarker extends React.Component {

  render() {

    let adoptstyle
      
    if (this.props.tree.owner) {
      adoptstyle = {
        color: "white",
        backgroundColor: "blue",
        fontFamily: "Arial",
        textAlign: "center"
      }
    }
    else {
      adoptstyle = {
        color: "white",
        backgroundColor: "green",
        fontFamily: "Arial",
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
