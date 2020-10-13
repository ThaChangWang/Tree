import React, { useState } from 'react';
import { db, storage } from "../firebase"

import { Formik, Form } from 'formik';
import { Button, Typography, TextField, Input, CircularProgress } from '@material-ui/core'

 
function EditProfile(props) {

  const [progress, setProgress] = useState(0)

  const handleUpload = (formData) => {

    console.log(formData)

    if (formData.image) {
      const uploadTask = storage.ref("images/" + formData.image.name + "-" + props.uid).put(formData.image)

      uploadTask.on("state_changed", (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setProgress(progress)
      },
      (error) => {
        alert(error.message)
      },
      () => {
        storage.ref("images").child(formData.image.name + "-" + props.uid).getDownloadURL().then(url => {
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
        bio: props.bio,
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
          label="Biography"
          name="bio"
          defaultValue={props.bio}
          multiline
          rows={8}
          variant="outlined"
          onChange={handleChange}
        />
        
      <div>
        <Input id="image" name="image" type="file"
          onChange={(event) => {
            setFieldValue("image", event.target.files[0]);
          }} />
          <CircularProgress variant="static" value={progress} />

      </div>


      <Button type="submit" color="secondary" variant="outlined" disabled={isSubmitting}> Submit </Button>

      </Form>

      )}
    </Formik>
  </div>
)

}



export default EditProfile