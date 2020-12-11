import React, { useEffect, useState } from "react"

import { db } from "../firebase"

import { Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1)
  },
  comment: {
    backgroundColor: "#4fc3f7"
  },
}))

function PostDisplay(props) {

    const [comments, setComments] = useState([])

    const classes = useStyles()

    console.log(props.post)

    let date = ""
    let time = ""
    
    if (props.post.timestamp) {
      date = props.post.timestamp.toDate().toLocaleDateString()
      time = props.post.timestamp.toDate().toLocaleTimeString()
    } 

    useEffect(() => {

    const unsubscribe = db.collection("comments").orderBy("timestamp", "desc").onSnapshot(snapshot => {
      let incomingComments = []

      snapshot.docs.forEach(doc => {
        if(doc.data().postId === props.post.psudeoId) {
          incomingComments.push(doc.data())
        }
      })

      setComments(incomingComments)

    })

    return () => {
      unsubscribe()
    }

   }, [props.post.psudeoId])

   

   const commentstyle = {
      paddingLeft: "10px",
      paddingRight: "10px",
      border: "4px solid blue"
   }

   const commentsep = {
      border: "1px solid blue"
   }

    return (
      <div className={classes.root}>
        <div>
          <img src={props.post.imageUrl} alt="" width="100%" /> 
          <Typography variant="h4" color="secondary" > {props.post.description} </Typography>
          <Typography variant="h5" color="secondary"> Posted By: {props.post.postedBy} </Typography>
          <Typography align="right" variant="h5" color="secondary"> {date + " @ " + time} </Typography>
          
        </div>
        <div style={commentstyle} className={classes.comment}>
          {comments.length > 0 ? comments.map(comment => {

            console.log(comment)
            console.log(comments)

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


export default PostDisplay