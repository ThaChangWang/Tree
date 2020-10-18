import React, { useState } from 'react';
import { db, storage } from "../firebase"

import { Formik, Form } from 'formik';
import { Button, Typography, TextField, Input, CircularProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  
  root: {
      margin: theme.spacing(1),
      width: '75ch'
  }
}))
 
function EditProfile(props) {

  const [progress, setProgress] = useState(0)
  const classes = useStyles()

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
    <Typography variant="h2" color="secondary"> Edit Profile: </Typography>
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
      <Form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off" >
      <Typography variant="h5" color="secondary"> Biography: </Typography>

      <TextField
          label="Biography"
          name="bio"
          defaultValue={props.bio}
          multiline
          className={classes.root}
          rows={8}
          variant="outlined"
          onChange={handleChange}
        />

        
      <div>
        <br/>
        <br/>
        <Typography variant="h5" color="secondary"> Profile Picture: </Typography>
        <Input id="image" name="image" type="file"
          onChange={(event) => {
            setFieldValue("image", event.target.files[0]);
          }} />
          <CircularProgress variant="static" value={progress} />

          <br/>
          <br/>

      </div>


      <Button type="submit" color="secondary" variant="outlined" disabled={isSubmitting}> Submit </Button>

      </Form>

      )}
    </Formik>
  </div>
)

}



export default EditProfile