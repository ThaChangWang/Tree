import React, { useState } from "react"

import firebase from "firebase"
import { db, storage } from "./firebase"

function Comment(props) {

  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState("")

  const handleChange = (e) => {
    if(e.target.files[0]) {
      setImage(e.target.files[0])
      console.log(image)
    }
  }

  const handleUpload = () => {
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
          db.collection("comments").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            imageUrl: url,
            description: description,
            props
          })
        })
          setProgress(0)
          setImage(null)
          setDescription("")
      }
      )
    }
    else {
      db.collection("comments").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            imageUrl: null,
            description: description,
            props
          })
      setProgress(0)
      setImage(null)
      setDescription("")
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
        <textarea style={criptstyle} placeholder="Enter a description..." onChange={event => setDescription(event.target.value)} value={description}></textarea>
        <br/>
        <progress value={progress} max="100"/>
        <input type="file" onChange={handleChange}/>
        <button onClick={handleUpload}> Upload </button>
      </div>
    )
  



    
}

export default Comment