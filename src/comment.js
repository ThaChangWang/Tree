import React, { useState } from "react"

import firebase from "firebase"
import { db, storage } from "./firebase"

function Comment(props) {

  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState(null)
  const [comment, setComment] = useState("")

  const handleChange = (e) => {
    if(e.target.files[0]) {
      setImage(e.target.files[0])
      console.log(image)
    }
  }

  const handleComment = () => {

    if (image) {
      const uploadTask = storage.ref("images/" + image.name).put(image)

      uploadTask.on("state_changed", (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setProgress(progress)
      },
      (error) => {
        alert(error.message)
      },
      () => {
        storage.ref("images").child(image.name).getDownloadURL().then(url => {

          let comments = props.post.comments

          let postComment = {
            imageUrl: url,
            timestamp: firebase.firestore.FieldValue.serverTimestamp().toString(),
            postedBy: props.username,
            comment: comment
          }

          comments.push(postComment)

          db.collection("posts").where("psudeoId", "==", props.post.psudeoId)
          .get()
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  //console.log(doc.id, " => ", doc.data())
                  db.collection("posts").doc(doc.id).update({
                    comments: comments
                  })

              })
              

          })
          .catch(function(error) {
              console.log("Error getting documents: ", error)
          })
          setProgress(0)
          setImage(null)
          setComment("")
      })
    })
    }


    else {
      let comments = props.post.comments

          let postComment = {
            imageUrl: null,
            timestamp: firebase.firestore.FieldValue.serverTimestamp().toString(),
            postedBy: props.username,
            comment: comment
          }

          comments.push(postComment)

          db.collection("posts").where("psudeoId", "==", props.post.psudeoId)
          .get()
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  //console.log(doc.id, " => ", doc.data())
                  db.collection("posts").doc(doc.id).update({
                    comments: comments
                  })

              })
              

          })
          .catch(function(error) {
              console.log("Error getting documents: ", error)
          })
          setProgress(0)
          setImage(null)
          setComment("")
    }

  }

  const criptstyle = {
        color: "white",
        backgroundColor: "black",
        padding: "10px",
        height: "50px",
        width: "500px",
        fontFamily: "Arial",
        textAlign: "left"

      }

    return (
      <div>
        <textarea style={criptstyle} placeholder="Enter a comment..." onChange={event => setComment(event.target.value)} value={comment}></textarea>
        <br/>
        <progress value={progress} max="100"/>
        <input type="file" onChange={handleChange}/>
        <button onClick={handleComment}> Upload </button>
      </div>
    )
  



    
}

export default Comment