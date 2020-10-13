import React from 'react';
import { auth, db } from "../firebase"

import { Formik, Field, Form } from 'formik';
import { Button, Typography, Box } from '@material-ui/core'
import { TextField } from 'formik-material-ui';




 
function SignUp(props) {

  const signUp = (formData) => {

    console.log(formData)

  auth.createUserWithEmailAndPassword(formData.email, formData.password)
  .then((authUser) => {

    console.log(authUser)

    db.collection("profiles").add({
          imageUrl: null,
          uid: authUser.user.uid,
          bio: null
        })

  return authUser.user.updateProfile({
      displayName: formData.displayName
    })

    

  })
  .catch((error) => alert(error.message))

  props.setPage("home")
    
}

  const signupstyle = {
  backgroundColor: "#FAEBD7"
}

  return (

    <div style={signupstyle}>
    <Typography variant="h2" color="secondary"> Sign Up: </Typography>
    <Formik
      initialValues = {{ 
        displayName: "", 
        email: "", 
        password: "",
        confPassword: ""
    }}

      validate = {values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } 
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }

        if (!values.displayName) {
          errors.displayName = "Required"
        }
        else if (values.displayName.length > 15) {
          errors.displayName = "Display name cannot be longer than 15 characters"
        }

        if (!values.password) {
          errors.password = "Required"
        }
        else if (values.password.length < 6) {
          errors.password = "Password must be at least 6 characters long"
        }

        if (!values.confPassword) {
          errors.confPassword = "Required"
        }
        else if (values.password !== values.confPassword) {
          errors.confPassword = "Passwords must match"
        }

        return errors
      }}

      onSubmit = {(values, { setSubmitting }) => {
        setTimeout(() => {
          signUp(values)
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
        <Box margin={3}>
          <Field
            component={TextField}
            type="text"
            label="Display Name"
            name="displayName"
          />
        </Box>
        {errors.displayName && touched.displayName}
        <Box margin={3}>
          <Field
            component={TextField}
            type="email"
            label="Email"
            name="email"
          />
        </Box>
        {errors.email && touched.email}
        <Box margin={3}>
          <Field
            component={TextField}
            type="password"
            label="Password"
            name="password"
          />
        </Box>
        {errors.password && touched.password}
        <Box margin={3}>
          <Field
            component={TextField}
            type="password"
            label="Confirm Password"
            name="confPassword"
          />
        </Box>
        {errors.confPassword && touched.confPassword}
        <Button type="submit" color="secondary" variant="outlined" disabled={isSubmitting}> Submit </Button>
      </Form>
      )}
    </Formik>
  </div>
);

}



export default SignUp