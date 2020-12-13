import React from "react"

import { db } from "../firebase"

import { Typography } from "@material-ui/core"

class PostDisplay extends React.Component {

   constructor() {
    super()
    this.state = {
      comments: []
    }
  }


    componentDidMount() {

    db.collection("publicTrees").doc(this.props.treeId).collection("posts")
    .doc(this.props.postId).collection("comments").orderBy("timestamp", "desc")
    .get().then((querySnapshot) => {

      let incomingComments = []

      querySnapshot.forEach(function(doc) {
        incomingComments.push(doc.data())
      })

      this.setState({
        comments: incomingComments
      })

    })

   }

   componentDidUpdate(prevProps, prevState, snapshot) {

    if (this.state !== prevState) {

      db.collection("publicTrees").doc(this.props.treeId).collection("posts")
      .doc(this.props.postId).collection("comments").orderBy("timestamp", "desc")
      .get().then((querySnapshot) => {

        let incomingComments = []

        querySnapshot.forEach(function(doc) {
          incomingComments.push(doc.data())
        })

        this.setState({
          comments: incomingComments
        })

      })
    } 
  }

   render() {
  

   const commentstyle = {
      paddingLeft: "10px",
      paddingRight: "10px",
      backgroundColor: "#87CEFA",
      border: "4px solid blue"
   }

   const commentsep = {
      border: "1px solid blue"
   }

   let comments = this.state.comments

    return (
      <div >
        <div>
          <img src={this.props.post.imageUrl} alt="" width="100%" /> 
          <Typography variant="h4" color="secondary" > {this.props.post.description} </Typography>
          <Typography variant="h5" color="secondary"> Posted By: {this.props.post.postedBy} </Typography>
          {this.props.post.timestamp ? 
          <Typography align="right" variant="h5" color="secondary"> {this.props.post.timestamp.toDate().toLocaleDateString() + " @ " + this.props.post.timestamp.toDate().toLocaleTimeString()} </Typography> :
          <Typography align="right" variant="h5" color="secondary"> "@ Right Now" </Typography>
          }
          
          
        </div>
        <div style={commentstyle} >
          {comments.length > 0 ? comments.map(comment => {

            let commentDate = ""
            let commentTime = ""
            
            if (comment.timestamp) {
              commentDate = comment.timestamp.toDate().toLocaleDateString()
              commentTime = comment.timestamp.toDate().toLocaleTimeString()
            } 

            if (comment.imageUrl) {
              return (
                <div key={comment.psudeoId}>

                  {comments[0].psudeoId === comment.psudeoId ? null : <hr style={commentsep}/>}
                  
                  <Typography variant="h6" color="secondary"> <b>{comment.postedBy}:</b> {comment.comment} </Typography>
                  <img src={comment.imageUrl} alt="" width="50%" />
                  <Typography align="right" variant="h6" color="secondary"> {commentDate + " @ " + commentTime} </Typography>
                  
                </div>
            )

            }

            else {
              return (
                <div key={comment.psudeoId}>

                {comments[0].psudeoId === comment.psudeoId ? null : <hr style={commentsep}/>}

                <Typography variant="h6" color="secondary"> <b>{comment.postedBy}:</b> {comment.comment} </Typography>
                <Typography align="right" variant="h6" color="secondary"> {commentDate + " @ " + commentTime} </Typography>
                </div>
              )
            }
            
          }) :
          <Typography variant="h5" color="secondary" align="center"> No comments </Typography> }
        </div>
      </div>
    )
   }

  }


export default PostDisplay