import React, { useState } from 'react';
import { db, storage } from "../firebase"
import firebase from "firebase"

import { Formik, Form } from 'formik';
import { Button, Typography, TextField, Input, CircularProgress, makeStyles } from '@material-ui/core'


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
    width: '40ch'
  },
  description: {
    margin: theme.spacing(3),
    width: '75ch'
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
          db.collection("posts").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            imageUrl: url,
            treeId: props.treeId,
            description: formData.description,
            psudeoId: Math.random().toString(36),
            postedBy: props.postedBy,
          })
        })
      })

  }


  return (

    <div>
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
        /* and other goodies */
      }) => (
      <Form onSubmit={handleSubmit} autoComplete="off" className={classes.root} >
      <br/>
      <Typography variant="h3" color="secondary"> Post on Tree: </Typography>
      

      <br/>

      <div>
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

      </Form>

      

      

      )}
    </Formik>
  </div>
)

}



export default Post

/*import React, { useState } from "react"

import firebase from "firebase"
import { db, storage } from "../firebase"

function Post(props) {

  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState("")

  const handleChange = (e) => {
    if(e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handlePost = () => {
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

          db.collection("posts").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            imageUrl: url,
            treeId: props.treeId,
            description: description,
            psudeoId: Math.random().toString(36),
            postedBy: props.postedBy,
            comments: []
          })

        })
          setProgress(0)
          setImage(null)
          setDescription("")
      }
      )
    }
    else {
      alert("Please provide an image.")
    }

  }

  const criptstyle = {
        color: "white",
        backgroundColor: "black",
        padding: "10px",
        height: "100px",
        width: "500px",
        fontFamily: "Arial",
        textAlign: "left"

      }

    return (
      <div>
        <textarea style={criptstyle} placeholder="Enter a description..." onChange={event => setDescription(event.target.value)} value={description}></textarea>
        <br/>
        <progress value={progress} max="100" />
        <input type="file" onChange={handleChange}/>
        <button onClick={handlePost}> Upload </button>
      </div>
    )
  



    
}

export default Post*/