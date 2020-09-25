import React from "react"

//import { db } from "./firebase"


class PostDisplay extends React.Component {
  constructor() {
    super()
    this.state = {
      //comments: []
    }
  }

  /*componentDidMount() {
    db.collection("comments").where("postId", "==", this.props.post.psudeoId)
    .get()
    .then((querySnapshot) => {
        let comments = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data())
            comments.push(doc.data())
        })
        this.setState({
              comments: comments
            })

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error)
    })
  }*/


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
          <img src={this.props.post.imageUrl} alt="" height="400" width="400" /> 
          <h3> {this.props.post.description} </h3>
          <h2> Posted By: {this.props.post.postedBy} </h2>
        </div>
        <div style={commentstyle}>
          {comments.length > 0 ? comments.map(comment => {
            return [comment.imageUrl ? 
             <img src={comment.imageUrl} alt="" height="100" width="100" /> :
             null,
            <h2> {comment.postedBy} : {comment.comment} </h2>]
          }) :
          null }
        </div>


      </div>
    )
  }
}

export default PostDisplay