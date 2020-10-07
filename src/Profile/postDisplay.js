import React from "react"

class PostDisplay extends React.Component {
  constructor() {
    super()
    this.state = {}
  }


  render() {

    const commentstyle = {
      color: "white",
      backgroundColor: "black",
      padding: "10px",
      fontFamily: "Arial",
      textAlign: "left"
    }

    let comments = this.props.post.comments

    return (
      <div>
        <div>
          <hr/>
          <img src={this.props.post.imageUrl} alt="" height="400" width="400" /> 
          <h3> {this.props.post.description} </h3>
          <h2> Posted By: {this.props.post.postedBy} </h2>
        </div>
        <div style={commentstyle}>
          {comments.length > 0 ? comments.map(comment => {
            return [comment.imageUrl ? 
              [<hr/>,
              <img key={Math.random().toString(36)} src={comment.imageUrl} alt="" height="200" width="200" />] :
              <hr/>,
            <h2> {comment.postedBy} : {comment.comment} </h2>,
            <hr/>]
          }) :
          null }
        </div>
        <hr/>
      </div>
    )
  }
}

export default PostDisplay