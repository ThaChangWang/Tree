import React, { useState } from "react"

import firebase from "firebase"
import { db, storage } from "./firebase"

function UploadPost(props) {

  const [caption, setCaption] = useState("")
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState(null)

  const handleChange = (e) => {
    if(e.target.files[0]) {
      setImage(e.target.files[0])
      console.log(image)
    }
  }

  const handleUpload = () => {
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
        db.collection("posts").add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          caption: caption,
          imageUrl: url,
          username: props.username
        })
      })
        setProgress(0)
        setCaption("")
        setImage(null)
    }
    )

  }

    return (
      <div>
        <progress value={progress} max="100" />
        <input type="text" placeholder="Enter a caption..." onChange={event => setCaption(event.target.value)} value={caption} />
        <input type="file" onChange={handleChange}/>
        <button onClick={handleUpload}> Upload </button>
        

      </div>
    )
}

export default UploadPost