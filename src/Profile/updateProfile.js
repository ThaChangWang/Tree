import React, { useState } from "react"

import { db, storage } from "../firebase"

function UpdateProfile(props) {

  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState(null)

  const handleChange = (e) => {
    if (e.target.files[0]) {
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
          db.collection("profiles").where("uid", "==", props.uid)
          .get()
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data())
                  db.collection("profiles").doc(doc.id).update({
                    imageUrl: url,
                    bio: props.bio
                  })
              })
          })
          .catch(function(error) {
              console.log("Error getting documents: ", error)
          })
              })

          props.setPage("home")
            }
        )
    }
    else {
      db.collection("profiles").where("uid", "==", props.uid)
          .get()
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data())
                  db.collection("profiles").doc(doc.id).update({
                    bio: props.bio
                  })
              })
          })
          .catch(function(error) {
              console.log("Error getting documents: ", error)
          })

          props.setPage("profile")

    }
  }

  console.log(progress)

    return (
      <div>
        
        <progress value={progress} max="100" />
        <input type="file" onChange={handleChange}/>
        <button onClick={handleUpload}> Update </button>
      </div>
    )
  
    
}

export default UpdateProfile