import React from "react"


class PublicTree extends React.Component {
  constructor() {
    super()
    this.state = {}
    
  }




  render() {

      return (
      <div>
          <h4>{this.props.tree.props.type}</h4>
          <br/>
          <img src={this.props.tree.imageUrl} alt="" height="500" width="500" />
          <br/>
          <h4> {this.props.tree.props.description} </h4>
      </div>
      )
    
  }
}

export default PublicTree