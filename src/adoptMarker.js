import React from "react"





class AdoptMarker extends React.Component {

  render() {

      return (
      <div>
        <img src={this.props.tree.imageUrl} alt="" height="50" width="50" />
        <button onClick={() => this.props.function(this.props.tree)}> View Tree </button>
      </div>
      )
    
    
  }
}

export default AdoptMarker
