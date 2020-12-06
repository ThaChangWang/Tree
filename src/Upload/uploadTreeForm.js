import React, { useState, useEffect } from 'react';
import { db, storage } from "../firebase"
import firebase from "firebase"

import GoogleMapReact from 'google-map-react';
import UploadMarker from "./uploadMarker"
import treeImg from "../images/tree.png"


import { Formik, Form } from 'formik';
import { Button, Typography, TextField, Input, CircularProgress, Box, makeStyles } from '@material-ui/core'

const Marker = () => <div><img src={treeImg} alt="" height="50" width="50" /></div>;

const useStyles = makeStyles((theme) => ({
  confirm: {
    color: "green"
  },
  error: {
    color: "red"
  },
  name: {
    margin: theme.spacing(1),
    width: '40ch'
  },
  description: {
    margin: theme.spacing(1),
    width: '75ch'
  }
}))
 
function UploadTreeForm(props) {

  const [progress, setProgress] = useState(0)
  const [displayTrees, setDisplayTrees] = useState([])
  const [confirm, setConfirm] = useState("")

  const classes = useStyles()

  const handleUpload = (formData) => {

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
          db.collection("publicTrees").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            imageUrl: url,
            psudeoId: Math.random().toString(36),
            description: formData.description,
            latitude: formData.lat,
            longitude: formData.lng,
            name: formData.name,
            owner: props.uid,
            postedBy: props.username
          })
        })
      })

  }

  useEffect(() => {

  const unsubscribe = db.collection("publicTrees").onSnapshot(snapshot => {
        setDisplayTrees(snapshot.docs.map(doc => doc.data()))

    })

    return () => {
      unsubscribe()
    }

  }, [])


  return (

    <div>
    <Typography variant="h2" color="secondary"> Upload a Tree: </Typography>
    <Formik
      initialValues = {{ 
        name: "",
        description: "",
        lat: 0,
        lng: 0,
        image: null
    }}

    validate = {values => {
      const errors = {}

      if (!values.name) {
          errors.name = "Tree name required"
        }

      if (!values.description) {
          errors.description = "Please enter a description for the tree"
        }

      if (!values.image) {
          errors.image = "Upload an image for your tree"
        }
        
      if (values.lat === 0 && values.lng === 0) {
          errors.lat = "Locate your tree on the Google Map above"
        }
      
      setConfirm("")
      
      return errors
    }}


      onSubmit = {(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          handleUpload(values)
          setSubmitting(false)
          resetForm({})
          setConfirm("Tree upload success.")

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
      <Form onSubmit={handleSubmit} autoComplete="off" >
      <br/>
      <Typography variant="h5" color="secondary"> Name the Tree: </Typography>

      <Box margin={3}>
          <TextField
          label="Name"
          name="name"
          className={classes.name}
          onChange={handleChange}
        />
      </Box>
      
      <br/>
      <br/>
      
      <Typography variant="h5" color="secondary"> Enter a Description: </Typography>

      <Box margin = {3}>
      <TextField
          label="Description"
          name="description"
          multiline
          className={classes.description}
          rows={8}
          variant="outlined"
          onChange={handleChange}
        />
      </Box>

      <div style={{ height: "100vh", width: "100%" }}>
        <br/>
        <Typography variant="h5" color="secondary"> Locate: </Typography>
        <br/>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBiB3iNngJM_kFWKxSv9a30O3fww7YTiWA"}}
          center={{lat : 48.0401, lng : -122.4063}}
          zoom={10}
          onClick={(event) => {

            setFieldValue("lat", event.lat)
            setFieldValue("lng", event.lng)
            
          }}
        >

      {displayTrees.length > 0 ? displayTrees.map(tree => {
        return <UploadMarker key={tree.psudeoId} lat={tree.latitude} lng={tree.longitude} imageUrl={tree.imageUrl} />
      }) :  null }

       <Marker
            lat={values.lat}
            lng={values.lng}
          />

        
          
        </GoogleMapReact>
    </div>

        
      <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <Typography variant="h5" color="secondary"> Picture of Tree: </Typography>
        <Input id="image" name="image" type="file"
          onChange={(event) => {
            setFieldValue("image", event.target.files[0])
          }} />
          <CircularProgress variant="static" value={progress} />

          <br/>

      </div>

      <br/>

      <Typography className={classes.error}> {errors.name} </Typography>
      <Typography className={classes.error}> {errors.description} </Typography>
      <Typography className={classes.error}> {errors.lat} </Typography>
      <Typography className={classes.error}> {errors.image} </Typography>
      <Typography className={classes.confirm}> {confirm} </Typography>

      <br/>

      <Button type="submit" color="secondary" variant="outlined" disabled={isSubmitting}> Submit </Button>

      

      </Form>

      

      )}
    </Formik>
  </div>
)

}



export default UploadTreeForm