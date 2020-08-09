import React from "react"

class Post extends React.Component {
  constructor() {
    super()
    this.state = {}
    
  }


  render() {
    return (
      <div>
          {this.props.username}
          <br/>
          {this.props.imgURL}
          <br/>
          {this.props.caption}
          <br/>
      </div>
    )
  }
}

export default Post