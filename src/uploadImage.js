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
          db.collection(props.db).add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            imageUrl: url,
            props
          })
        })
          setProgress(0)
          setImage(null)
      }
      )
    }
    else {
      alert("Please provide an image.")
    }

  }

  if (props.latitude !== 0 && props.longitude !== 0) {
    return (
      <div>
        
        <progress value={progress} max="100" />
        <input type="file" onChange={handleChange}/>
        <button onClick={handleUpload}> Upload </button>
      </div>
    )
  }

  else {
    return (
      <div>
        <h3> Click on the map to locate your tree </h3>
      </div>
    )
  }

    
}

export default UploadImage