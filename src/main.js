import React, { useState, useEffect } from "react"

import { Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

import SignUp from "./Auth/signUp"
import LogIn from "./Auth/logIn"
import Home from "./Home/home"
import Feedback from "./Home/feedback"
import UploadTreeForm from "./Upload/uploadTreeForm"
import AdoptMap from "./Find/adoptMap"
import Profile from "./Profile/profile"

import treeImg from "./images/tree.png"
import "./style.css"

import { auth } from "./firebase"

const useStyles = makeStyles({
  message: {
    color: "green"
  },
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
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  const classes = useStyles()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function(authUser)  {

      if (authUser) {
        console.log(authUser)
        setUser(authUser)

        /*if (!authUser.displayName) {
          return authUser.updateProfile({
            displayName: username
          })
        }*/
       
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

      console.log(user)


      return (
        <div>

          <div style={headerstyle}>

          <img src={treeImg} alt="" height="50" width="50" /> 
          <Typography className={classes.title} gutterBottom variant="h2" align="center" color="secondary"> Public Tree </Typography>
          <img src={treeImg} alt="" height="50" width="50" />

          <br/>
          <br/>

          <Button className={classes.clickedButtonStyle} variant="outlined" color="secondary" onClick={() => [setPage("home"), setMessage(null)]}>home</Button>

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("find")}>find</Button>) :
          null
          }
          
          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>{user.displayName ? user.displayName : "profile"}</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [auth.signOut(), setPage("home")]}>logout</Button>) :
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("login")}>login</Button>)
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("feedback")}>feedback</Button>) :
          null
          }

          </div>

          <Typography className={classes.message}> {message} </Typography>

          <Home />

        </div>
      )
      
      
    }

    
    else if (page === "find") {

      return (
        <div>

          <div style={headerstyle}>

          <img src={treeImg} alt="" height="50" width="50" />
          <Typography className={classes.title} gutterBottom variant="h2" align="center" color="secondary"> Public Tree </Typography>
          <img src={treeImg} alt="" height="50" width="50" />

          <br/>
          <br/>

          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [setPage("home"), setMessage(null)]}>home</Button>

          {user ? 
          (<Button className={classes.clickedButtonStyle} variant="outlined" color="secondary" onClick={() => setPage("find")}>find</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>{user.displayName}</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [auth.signOut(), setPage("home")]}>logout</Button>) :
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("login")}>login</Button>)
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("feedback")}>feedback</Button>) :
          null
          }


          </div>


          <br/>

          <AdoptMap uid={user.uid} username={user.displayName} height="100vh" width="100%" lat={47.7511} lng={-120.7401} zoom={6} />



        </div>
      )
    }

    else if (page === "upload") {


      return (
        <div>

          <div style={headerstyle}>

          <img src={treeImg} alt="" height="50" width="50" />
          <Typography className={classes.title} gutterBottom variant="h2" align="center" color="secondary"> Public Tree </Typography>
          <img src={treeImg} alt="" height="50" width="50" />

          <br/>
          <br/>

          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [setPage("home"), setMessage(null)]}>home</Button>

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("find")}>find</Button>) :
          null
          }
          
          {user ? 
          (<Button className={classes.clickedButtonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>{user.displayName}</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [auth.signOut(), setPage("home")]}>logout</Button>) :
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("login")}>login</Button>)
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("feedback")}>feedback</Button>) :
          null
          }


          </div>

          <UploadTreeForm uid={user.uid} username={user.displayName} setPage={setPage} setMessage={setMessage} />

        </div>
      )
    }

    else if (page === "profile") {


      return (
        <div>

          <div style={headerstyle}>

          <img src={treeImg} alt="" height="50" width="50" />
          <Typography className={classes.title} gutterBottom variant="h2" align="center" color="secondary"> Public Tree </Typography>
          <img src={treeImg} alt="" height="50" width="50" />

          <br/>
          <br/>


          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [setPage("home"), setMessage(null)]}>home</Button>

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("find")}>find</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.clickedButtonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>{user.displayName}</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [auth.signOut(), setPage("home")]}>logout</Button>) :
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("login")}>login</Button>)
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("feedback")}>feedback</Button>) :
          null
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

          <img src={treeImg} alt="" height="50" width="50" />
          <Typography className={classes.title} gutterBottom variant="h2" align="center" color="secondary"> Public Tree </Typography>
          <img src={treeImg} alt="" height="50" width="50" />

          <br/>
          <br/>

          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [setPage("home"), setMessage(null)]}>home</Button>

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("find")}>find</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>{user.displayName}</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [auth.signOut(), setPage("home")]}>logout</Button>) :
          (<Button className={classes.clickedButtonStyle} variant="outlined" color="secondary" onClick={() => setPage("login")}>login</Button>)
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("feedback")}>feedback</Button>) :
          null
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

          <img src={treeImg} alt="" height="50" width="50" />
          <Typography className={classes.title} gutterBottom variant="h2" align="center" color="secondary"> Public Tree </Typography>
          <img src={treeImg} alt="" height="50" width="50" />

          <br/>
          <br/>

          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [setPage("home"), setMessage(null)]}>home</Button>

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("find")}>find</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>{user.displayName}</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [auth.signOut(), setPage("home")]}>logout</Button>) :
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("login")}>login</Button>)
          }

          {user ? 
          (<Button className={classes.clickedButtonStyle} variant="outlined" color="secondary" onClick={() => setPage("feedback")}>feedback</Button>) :
          null
          }

          </div>

          <br/>

          <Feedback username={user.displayName} setPage={setPage} setMessage={setMessage}/>


        </div>
      )
    }

    
  
    
  }
    

export default Main