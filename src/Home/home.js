import React, { useState, useEffect } from "react"
import AdoptMap from "./adoptMap"
import LogIn from "../Auth/logIn"
import SignUp from "../Auth/signUp"

import { Typography, Button, Grid } from '@material-ui/core'

function Home(props) {

    const [dateNum, setDateNum] = useState(null)
    const [newUser, setNewUser] = useState(false)

    useEffect(() => {
    
      var dateObj = new Date()
      var month = dateObj.getMonth()
      var day = dateObj.getDate()
      var year = dateObj.getFullYear()

      setDateNum(year + month + day)

    }, [])

    console.log(dateNum)

    if (props.loggedIn) {

      return (
      <div>
      <br />
        <AdoptMap uid={props.uid} username={props.username} />      
      </div>
    )

    }

    else {

      return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h2" align="center" color="secondary"> Community Tree </Typography>
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
          
        
      </div>
    )

    }
    
  }

export default Home