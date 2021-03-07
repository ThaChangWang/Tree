import React, { useState } from "react"
import AdoptMap from "./adoptMap"
import LogIn from "../Auth/logIn"
import SignUp from "../Auth/signUp"

import { Typography, Button, Grid } from '@material-ui/core'

function Home(props) {

    const [newUser, setNewUser] = useState(false)

    if (props.loggedIn) {

      return (
      <div>
      <br />
        <AdoptMap uid={props.uid} username={props.username} setViewTree={props.setViewTree} setPage={props.setPage}/>      
      </div>
    )

    }

    else {

      return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h2" align="center" color="secondary"> comTree </Typography>
            <Typography variant="h5" align="center" color="secondary"> Hug a tree in your community. </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LogIn />
            <br />
            <Button color="secondary" variant="outlined" onClick={() => setNewUser(!newUser)}> New User? </Button>
            <br />
            {newUser ?
            [<br />, 
            <SignUp />] :
            null}
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
        <br />
        <br />
          
        
      </div>
    )

    }
    
  }

export default Home