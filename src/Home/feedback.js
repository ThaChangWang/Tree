import React from 'react';
import { db } from "../firebase"

import firebase from "firebase"

import { Formik, Form } from 'formik';
import { Button, Typography, Box, TextField, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  error: {
    color: "red"
  },
  email: {
    margin: theme.spacing(1),
    width: "30ch"
  },
  message: {
    margin: theme.spacing(1),
    width: '75ch'
  }
}))

 
function Feedback(props) {

  const classes = useStyles()

  const feedback = (formData) => {

    console.log(formData)

    db.collection("feedback").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            username: props.username,
            email: formData.email,
            message: formData.message
          })
    
}

  const signupstyle = {
  backgroundColor: "#FAEBD7"
}

  return (

    <div style={signupstyle}>
    <Typography variant="h3" color="secondary"> Feedback: </Typography>
    <Formik
      initialValues = {{  
        email: "", 
        message: ""
    }}

      validate = {values => {
        const errors = {};

        console.log(values)

        if (!values.message) {
          errors.message = "Please enter a message"
        }

        return errors
      }}

      onSubmit = {(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          feedback(values)
          setSubmitting(false)
          resetForm({})
          props.setMessage("Message recieved!")
          props.setPage("home")

        }, 400);
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
      <Form onSubmit={handleSubmit} autoComplete="off">
        
        <Box margin={7}>
          <TextField
            className={classes.message}
            multiline
            rows={4}
            variant="outlined"
            type="text"
            label="Message"
            name="message"
            onChange={handleChange}
          />
        </Box>

        <Box margin={7}>
          <TextField
            className={classes.email}
            type="text"
            label="Return Email (Optional)"
            name="email"
            onChange={handleChange}
          />
        </Box>

        <Typography className={classes.error} > {errors.message} </Typography>
        <br/>
       
        <Button type="submit" color="secondary" variant="outlined" disabled={isSubmitting}> Send </Button>
      </Form>
      )}
    </Formik>
  </div>
);

}



export default Feedback