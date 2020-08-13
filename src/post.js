import React from "react"

class Post extends React.Component {
  constructor() {
    super()
    this.state = {}
    
  }


  render() {
    return (
      <div>
          <h4>{this.props.username}</h4>
          <br/>
          <img src={this.props.imageUrl} alt="" height="200" width="200" />
          <br/>
          <h4>{this.props.caption}</h4>
          <br/>
      </div>
    )
  }
}

export default Post