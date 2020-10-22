
import React, { useState } from 'react';
import { db, storage } from "../firebase"
import firebase from "firebase"

import { Formik, Form } from 'formik';
import { Button, Typography, TextField, Input, CircularProgress, Grid, makeStyles } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1)
  },
  error: {
    margin: theme.spacing(3),
    color: "red"
  },
  image: {
    margin: theme.spacing(3),
    width: '25ch'
  },
  comment: {
    margin: theme.spacing(3),
    width: '40ch'
  }
}))
 
function Comment(props) {

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
                db.collection("comments").add({
                  imageUrl: url,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  postedBy: props.username,
                  comment: formData.comment,
                  postId: props.post.psudeoId
                })
              })
            })

    }

    else {

      db.collection("comments").add({
        imageUrl: null,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        postedBy: props.username,
        comment: formData.comment,
        postId: props.post.psudeoId
      })

    }

    

  }


  return (

    <div>
    <Formik
      initialValues = {{ 
        comment: "",
        image: null
    }}

    validate = {values => {
      const errors = {}

      if (!values.image && !values.comment) {
          errors.image = "Upload at least an image or a comment"
        }
      

      return errors
    }}


      onSubmit = {(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          handleUpload(values)
          setSubmitting(false)
          resetForm({})
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
      <Form onSubmit={handleSubmit} autoComplete="off" className={classes.root} >
      <Typography variant="h4" color="secondary"> Comment </Typography>
      <br/>
      <Grid container spacing={4}>
          <Grid item xs={6}>
            <Typography variant="h5" color="secondary"> Enter a comment: </Typography>
            <TextField
                label="Comment"
                name="comment"
                multiline
                className={classes.comment}
                rows={3}
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <div>
                <br/>
                <Typography variant="h5" color="secondary"> Picture of Tree: </Typography>
                <Input className={classes.image} id="image" name="image" type="file"
                  onChange={(event) => {
                    setFieldValue("image", event.target.files[0])
                  }} />
                  <CircularProgress variant="static" value={progress} />
              </div>
            </Grid>
    </Grid>

      <Typography className={classes.error}> {errors.image} </Typography>

      <Button type="submit" color="secondary" variant="outlined" disabled={isSubmitting}> Comment </Button>

      </Form>

      )}
    </Formik>
  </div>
)

}



export default Comment

