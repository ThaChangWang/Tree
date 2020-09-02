import React, { useState } from "react"

import firebase from "firebase"
import { db, storage } from "./firebase"

function UploadImage(props) {

  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState(null)

  console.log(props)

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
        db.collection(props.db).add({
          id: Math.random().toString(36).substr(2, 9),
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          imageUrl: url,
          props

          /*username: props.username,
          latitude: props.latitude,
          longitude: props.longitude,
          type: props.type,
          description: props.description*/


        })
      })
        setProgress(0)
        setImage(null)
    }
    )

  }

    return (
      <div>
        <progress value={progress} max="100" />
        <input type="file" onChange={handleChange}/>
        <button onClick={handleUpload}> Upload </button>
      </div>
    )
}

export default UploadImage