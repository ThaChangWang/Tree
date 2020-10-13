import React, { useState } from 'react';
import { db, storage } from "../firebase"

import { Formik, Form } from 'formik';
import { Button, Typography, TextField } from '@material-ui/core'




 
function EditProfile(props) {

  const [progress, setProgress] = useState(0)

  const handleUpload = (formData) => {

    console.log(formData.image.name)

    if (formData.image) {
      const uploadTask = storage.ref("images/" + formData.image.name).put(formData.image)

      uploadTask.on("state_changed", (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setProgress(progress)
      },
      (error) => {
        alert(error.message)
      },
      () => {
        storage.ref("images").child(formData.image.name).getDownloadURL().then(url => {
          db.collection("profiles").where("uid", "==", props.uid)
          .get()
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data())
                  db.collection("profiles").doc(doc.id).update({
                    imageUrl: url,
                    bio: formData.bio
                  })
              })
          })
          .catch(function(error) {
              console.log("Error getting documents: ", error)
          })
              })

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
                    bio: formData.bio
                  })
              })
          })
          .catch(function(error) {
              console.log("Error getting documents: ", error)
          })

    }
  }




  return (

    <div>
    <Typography variant="h2" color="secondary"> Edit </Typography>
    <Formik
      initialValues = {{ 
        bio: "",
        image: null
    }}

    validate = {values => {
        const errors = {}

      return errors
    }}


      onSubmit = {(values, { setSubmitting }) => {
        setTimeout(() => {
          handleUpload(values)
          setSubmitting(false)
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue
        /* and other goodies */
      }) => (
      <Form onSubmit={handleSubmit}>

      <TextField
          label="Multiline"
          name="bio"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="outlined"
        />
        
      <div>
        <input id="image" name="image" type="file"
          onChange={(event) => {
            setFieldValue("image", event.target.files[0]);
          }} />
      </div>


      <Button type="submit" color="secondary" variant="outlined" disabled={isSubmitting}> Submit </Button>
      <progress value={progress} max="100" />

      </Form>

      )}
    </Formik>
  </div>
)

}



export default EditProfile