import React, { useState } from 'react';
import { db } from "../firebase"

import firebase from "firebase"

import { Formik, Form } from 'formik';
import { Button, Typography, Box, TextField, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  confirm: {
    color: "green"
  },
  error: {
    color: "red"
  },
  email: {
    margin: theme.spacing(1),
    width: "50%"
  },
  message: {
    margin: theme.spacing(1),
    width: '80%'
  }
}))

 
function Feedback(props) {

  const classes = useStyles()
  const [confirm, setConfirm] = useState("")

  const feedback = (formData) => {

    db.collection("feedback").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            username: props.username,
            email: formData.email,
            message: formData.message
          })
    
}

  const signupstyle = {
    backgroundColor: "#FFFFF0",
    borderRadius: "15px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    paddingLeft: "10px",
    paddingRight: "10px",
    marginLeft: "10px",
    marginRight: "10px"
}

  return (

    <div style={signupstyle}>
    <Typography variant="h2" color="secondary"> Feedback: </Typography>
    <Formik
      initialValues = {{  
        email: "", 
        message: ""
    }}

      validate = {values => {
        const errors = {};

        if (!values.message) {
          errors.message = "Please enter a message"
        }

        setConfirm("")

        return errors
      }}

      onSubmit = {(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          feedback(values)
          setSubmitting(false)
          resetForm({})
          setConfirm("Feedback recieved, thank you.")

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
        <Typography className={classes.confirm} > {confirm} </Typography>
        <br/>
       
        <Button type="submit" color="secondary" variant="outlined" disabled={isSubmitting}> Send </Button>
        <br />
        <br />
      </Form>
      )}
    </Formik>
  </div>
);

}



export default Feedback