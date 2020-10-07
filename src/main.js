import React, { useState, useEffect } from "react"
import { Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Login from "./Login/login"
import Home from "./Home/home"
import UploadForm from "./Upload/uploadForm"
import AdoptMap from "./Find/adoptMap"
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
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [userId, setUserId] = useState(null)

  const classes = useStyles()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function(authUser)  {
      if (authUser) {
        setUser(authUser.displayName)
        setUserId(authUser.uid)
      } else {
        setUser(null)
      }

    })

    return () => {
      unsubscribe()
    }

  }, [])


    const headerstyle = {
      textAlign: "center"
    }

    console.log(user)

    if (page === "home") {

      return (
        <div>

          <div style={headerstyle}>

          <img src={treeImg} alt="" height="50" width="50" /> 
          <Typography className={classes.title} gutterBottom variant="h2" align="center" color="secondary"> Public Tree </Typography>
          <img src={treeImg} alt="" height="50" width="50" />

          <br/>
          <br/>

          <Button className={classes.clickedButtonStyle} variant="outlined" color="secondary" onClick={() => [setPage("home"), setMessage(null)]}>home</Button>
          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("find")}>find</Button>
          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>{user}</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => auth.signOut()}>logout</Button>) :
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("login")}>login</Button>)
          }

          </div>

          <h2> {message} </h2>

          <Home />

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
          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("find")}>find</Button>
          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>{user}</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => auth.signOut()}>logout</Button>) :
          (<Button className={classes.clickedButtonStyle} variant="outlined" color="secondary" onClick={() => setPage("login")}>login</Button>)
          }

          </div>

          <br/>

          <Login setPage={setPage} setMessage={setMessage}/>

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
          <Button className={classes.clickedButtonStyle} variant="outlined" color="secondary" onClick={() => setPage("find")}>find</Button>
          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>{user}</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => auth.signOut()}>logout</Button>) :
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("login")}>login</Button>)
          }


          </div>


          <br/>

          <AdoptMap username={user} height="100vh" width="100%" lat={47.7511} lng={-120.7401} zoom={6} />



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
          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("find")}>find</Button>
          <Button className={classes.clickedButtonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>{user}</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => auth.signOut()}>logout</Button>) :
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("login")}>login</Button>)
          }


          </div>


          {user ? 
          (<UploadForm username={user} />) :
          (<h1> Need to sign in to upload </h1>)
          }



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
          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("find")}>find</Button>
          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>

          {user ? 
          (<Button className={classes.clickedButtonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>{user}</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => auth.signOut()}>logout</Button>) :
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("login")}>login</Button>)
          }


          </div>

        <br/>

        <Profile uid={userId} username={user}/>

        </div>
      )
    }

    
  
    
  }
    

export default Main