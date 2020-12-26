import React from 'react';
import { auth } from "../firebase"

import { Formik, Field, Form } from 'formik';
import { Button, Typography, Box, makeStyles } from '@material-ui/core'
import { TextField } from 'formik-material-ui';


const useStyles = makeStyles((theme) => ({
  
  root: {
    width: "80%"
  }

}))

 
function LogIn(props) {

  const classes = useStyles()


  const logIn = (formData) => {

    auth.signInWithEmailAndPassword(formData.email, formData.password)
    .catch((error) => alert(error.message))

    props.setPage("home")
    
}

  const signupstyle = {
    backgroundColor: "#FAEBD7",
    border: "4px solid brown",
    paddingLeft: "10px",
    paddingRight: "10px"
  }

  return (

    <div style={signupstyle}>
    <Typography variant="h2" color="secondary"> Log In: </Typography>
    <Formik
      initialValues = {{ 
        email: "", 
        password: ""
    }}

      validate = {values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } 

        if (!values.password) {
          errors.password = "Required"

        return errors
      }}
      }

      onSubmit = {(values, { setSubmitting }) => {
        setTimeout(() => {
          logIn(values)
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
      <br/>
        <Box margin={5}>
          <Field
            component={TextField}
            className={classes.root}
            type="email"
            label="Email"
            name="email"
          />
        </Box>
        {errors.email && touched.email}
        <br/>
        <Box margin={5}>
          <Field
            component={TextField}
            className={classes.root}
            type="password"
            label="Password"
            name="password"
          />
        </Box>
        <br/>
        {errors.password && touched.password}
        <Button type="submit" color="secondary" variant="outlined" disabled={isSubmitting}> Submit </Button>
        <br />
        <br />
      </Form>
      )}
    </Formik>
  </div>
);

}



export default LogIn