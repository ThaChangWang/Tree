import React from "react"


class PublicTree extends React.Component {
  constructor() {
    super()
    this.state = {}
    
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

      return (
      <div>
          <h4>{this.props.tree.props.name}</h4>
          <br/>
            <div style={treestyle}>
            <img src={this.props.tree.imageUrl} alt="" height={this.props.height} width={this.props.width} />
            <h4> {this.props.tree.props.description} </h4>
            </div>
      </div>
      )
    
  }
}

export default PublicTree