import React, { useState } from "react"

import firebase from "firebase"
import { db, storage } from "./firebase"

function Post(props) {

  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState(null)

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
            psudeoId: Math.random().toString(36),
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

    return (
      <div>
        <progress value={progress} max="100" />
        <input type="file" onChange={handleChange}/>
        <button onClick={handleUpload}> Upload </button>
      </div>
    )
  



    
}

export default Post