import React, { useState } from 'react';
import { db, storage } from "../firebase"
import firebase from "firebase"

import { Formik, Form } from 'formik';
import { Button, Typography, TextField, Input, CircularProgress, makeStyles } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  
  error: {
    margin: theme.spacing(3),
    color: "red"
  },
  image: {
    margin: theme.spacing(3),
    width: '30ch'
  },
  description: {
    margin: theme.spacing(3),
    width: '80%'
  },
  post: {
    backgroundColor: "#FFFFF0",
    borderRadius: "15px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    paddingLeft: "10px",
    paddingRight: "10px",
    marginLeft: "10px",
    marginRight: "10px"
  }
}))
 
function Post(props) {

  const [progress, setProgress] = useState(0)
  const classes = useStyles()

  const handleUpload = (formData) => {

    console.log(formData)

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
          db.collection("publicTrees").where("psudeoId", "==", props.treeId).get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
              console.log(doc.id, " => ", doc.data())

                db.collection("publicTrees").doc(doc.id).update({
                  imageUrl: url,
                }).then(
                  db.collection("publicTrees").doc(doc.id).collection("posts").add({
                  psudeoId: Math.random().toString(36),
                  postedBy: props.username,
                  postedbyId: props.uid,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  imageUrl: url,
                  description: formData.description
                })
                )

              })
            })
        })
      })

  }


  return (

    <div className={classes.post}>
    <Formik
      initialValues = {{ 
        description: "",
        image: null
    }}

    validate = {values => {
      const errors = {}

      if (!values.image) {
          errors.image = "Upload an image of your tree to post"
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
      }) => (
      <Form onSubmit={handleSubmit} autoComplete="off" className={classes.root} >
      <br/>
      <div>
        <hr />
        <Typography align="center" variant="h3" color="secondary"> Post on Tree </Typography>
        <hr />
        <br/>

        <br/>
        <Typography variant="h5" color="secondary"> Picture of Tree: </Typography>
        <Input className={classes.image} id="image" name="image" type="file"
          onChange={(event) => {
            setFieldValue("image", event.target.files[0])
          }} />
          <CircularProgress variant="static" value={progress} />

      </div>
      
      <br/>

      <Typography variant="h5" color="secondary"> Enter a Description: </Typography>

      <TextField
          label="Description"
          name="description"
          multiline
          className={classes.description}
          rows={8}
          variant="outlined"
          onChange={handleChange}
        />

      <Typography className={classes.error}> {errors.image} </Typography>

      <br/>

      <Button type="submit" color="secondary" variant="outlined" disabled={isSubmitting}> Submit </Button>

      <br />
      <br />

      </Form>

      

      

      )}
    </Formik>
  </div>
)

}



export default Post