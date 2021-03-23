import React, { useState } from "react"
import AdoptMap from "./adoptMap"
import LogIn from "./Auth/logIn"
import SignUp from "./Auth/signUp"

import { Typography, Button, Grid, Avatar, makeStyles } from '@material-ui/core'

import comtree from "../images/comTreeSym.png"

const useStyles = makeStyles({
  
  title: {
    display: "inline"
  }

})

function Home(props) {

    const [newUser, setNewUser] = useState(false)
    const classes = useStyles()

    if (props.loggedIn) {

      return (
        <AdoptMap uid={props.uid} username={props.username} setViewTree={props.setViewTree} setPage={props.setPage}/>      
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
          <Grid item xs={12} sm={6} style={{textAlign: "center"}}>
              <Typography className={classes.title} variant="h2" align="center" color="secondary">com</Typography>
          <Avatar src={comtree} alt="" style={{ height: "68.939px", width: "45px", display: "inline-block" }} />
          <Typography className={classes.title} variant="h2" align="center" color="secondary">ree</Typography>
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