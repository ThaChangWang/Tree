import React, { useState, useEffect } from "react"

import { Button, Typography, Grid, makeStyles } from "@material-ui/core"

import SignUp from "./Auth/signUp"
import LogIn from "./Auth/logIn"
import Home from "./Home/home"
import Feedback from "./Home/feedback"
import UploadTreeForm from "./Upload/uploadTreeForm"
import Profile from "./Profile/profile"

import treeImg from "./images/tree.png"
import "./style.css"

import { auth } from "./firebase"

const useStyles = makeStyles({
  
  buttonStyle: {
    backgroundColor: "#9ccc65"
  },
  clickedButtonStyle: {
    backgroundColor: "black",
    color: "white"
  },
  title: {
    display: "inline"
  }

})

function Main(props) {

  const [page, setPage] = useState(props.page)
  const [user, setUser] = useState(null)

  const classes = useStyles()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function(authUser)  {

      if (authUser) {
        setUser(authUser)
       
      } 
      else {
        setUser(null)
      }

    })

    return () => {
      unsubscribe()
    }

  }, [user])

    const headerstyle = {
      textAlign: "center"
    }

    if (page === "home") {

      return (
        <div>

          <div style={headerstyle}>

          <img src={treeImg} alt="" width="50" /> 
          <Typography className={classes.title} gutterBottom variant="h2" align="center" color="secondary"> Community Tree </Typography>
          <img src={treeImg} alt="" width="50" />

          <br/>
          <br/>

          <Button className={classes.clickedButtonStyle} variant="outlined" color="secondary" onClick={() => setPage("home")}>home</Button>
          
          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>{user.displayName ? user.displayName : "profile"}</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("feedback")}>feedback</Button>) :
          null
          }

           {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [auth.signOut(), setPage("home")]}>logout</Button>) :
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("login")}>login</Button>)
          }

          </div>

          {user ?
          <Home uid={user.uid} username={user.displayName} loggedIn={true} /> :
          <Home loggedIn={false} />
          }

        </div>
      )
      
      
    }


    else if (page === "upload") {


      return (
        <div>

          <div style={headerstyle}>

          <img src={treeImg} alt="" width="50" />
          <Typography className={classes.title} gutterBottom variant="h2" align="center" color="secondary"> Community Tree </Typography>
          <img src={treeImg} alt="" width="50" />

          <br/>
          <br/>

          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("home")}>home</Button>
          
          {user ? 
          (<Button className={classes.clickedButtonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>{user.displayName}</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("feedback")}>feedback</Button>) :
          null
          }

           {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [auth.signOut(), setPage("home")]}>logout</Button>) :
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("login")}>login</Button>)
          }


          </div>

          <br />
          <UploadTreeForm uid={user.uid} username={user.displayName} />

        </div>
      )
    }

    else if (page === "profile") {


      return (
        <div>

          <div style={headerstyle}>

          <img src={treeImg} alt="" width="50" />
          <Typography className={classes.title} gutterBottom variant="h2" align="center" color="secondary"> Community Tree </Typography>
          <img src={treeImg} alt="" width="50" />

          <br/>
          <br/>


          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("home")}>home</Button>

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.clickedButtonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>{user.displayName}</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("feedback")}>feedback</Button>) :
          null
          }

           {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [auth.signOut(), setPage("home")]}>logout</Button>) :
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("login")}>login</Button>)
          }


          </div>

        <br/>

        <Profile uid={user.uid} username={user.displayName} setPage={setPage}/>

        </div>
      )
    }

    else if (page === "login") {


      return (
        <div>

          <div style={headerstyle}>

          <img src={treeImg} alt="" width="50" />
          <Typography className={classes.title} gutterBottom variant="h2" align="center" color="secondary"> Community Tree </Typography>
          <img src={treeImg} alt="" width="50" />

          <br/>
          <br/>

          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("home")}>home</Button>

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>{user.displayName}</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("feedback")}>feedback</Button>) :
          null
          }

           {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [auth.signOut(), setPage("home")]}>logout</Button>) :
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("login")}>login</Button>)
          }

          </div>

          <br/>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <SignUp setPage={setPage}/>
            </Grid>
            <Grid item xs={6}>
              <LogIn setPage={setPage}/>
            </Grid>
          </Grid>

        </div>
      )
    }

    else if (page === "feedback") {


      return (
        <div>

          <div style={headerstyle}>

          <img src={treeImg} alt="" width="50" />
          <Typography className={classes.title} gutterBottom variant="h2" align="center" color="secondary"> Community Tree </Typography>
          <img src={treeImg} alt="" width="50" />

          <br/>
          <br/>

          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("home")}>home</Button>

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>{user.displayName}</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.clickedButtonStyle} variant="outlined" color="secondary" onClick={() => setPage("feedback")}>feedback</Button>) :
          null
          }

           {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [auth.signOut(), setPage("home")]}>logout</Button>) :
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("login")}>login</Button>)
          }

          </div>

          <br/>

          <Feedback username={user.displayName} />


        </div>
      )
    }

    
  
    
  }
    

export default Main