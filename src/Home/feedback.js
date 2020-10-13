import React from 'react';
import { db } from "../firebase"

import firebase from "firebase"

import { Formik, Field, Form } from 'formik';
import { Button, Typography, Box } from '@material-ui/core'
import { TextField } from 'formik-material-ui';




 
function Feedback(props) {

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
    <Typography variant="h3" color="secondary"> Questions/Comments/Issues/Ideas?: </Typography>
    <Formik
      initialValues = {{  
        email: "", 
        message: ""
    }}

      validate = {values => {
        const errors = {};

        if (!values.message) {
          errors.message = "Required"
        }

        return errors
      }}

      onSubmit = {(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          feedback(values)
          resetForm({})
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
        /* and other goodies */
      }) => (
      <Form onSubmit={handleSubmit}>
        <Box margin={7}>
          <Field
            component={TextField}
            type="email"
            label="Email"
            name="email"
          />
        </Box>
        {errors.email && touched.email}
        <Box margin={7}>
          <Field
            component={TextField}
            type="text"
            label="Message"
            name="message"
          />
        </Box>
        {errors.message && touched.message}
       
        <Button type="submit" color="secondary" variant="outlined" disabled={isSubmitting}> Submit </Button>
      </Form>
      )}
    </Formik>
  </div>
);

}



export default Feedback