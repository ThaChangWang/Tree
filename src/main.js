import React, { useState, useEffect } from "react"

import { Button, Typography, Avatar, makeStyles } from "@material-ui/core"

import Home from "./Home/home"
import Feedback from "./Home/feedback"
import UploadTreeForm from "./Upload/uploadTreeForm"
import Profile from "./Profile/profile"
import PublicTree from "./Tree/publicTree"

import comtree from "./images/comTreeSym.png"

import "./style.css"

import { auth } from "./firebase"

const useStyles = makeStyles({
  
  buttonStyle: {
    backgroundColor: "#FFFFF0"
  },
  title: {
    display: "inline"
  }

})

function Main(props) {

  const [page, setPage] = useState(props.page)
  const [user, setUser] = useState(null)
  const [viewTree, setViewTree] = useState(null)

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

    if (user) {

      return (
        <div>

          <div style={headerstyle}>

          <Typography className={classes.title} gutterBottom variant="h2" align="center" color="secondary">com</Typography>
          <Avatar src={comtree} alt="" style={{ height: "68.939px", width: "45px", display: "inline-block" }} />
          <Typography className={classes.title} gutterBottom variant="h2" align="center" color="secondary">ree</Typography>
         
          <br/>
          <br/>

          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("home")}>home</Button>
          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>
          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>{user.displayName ? user.displayName : "profile"}</Button>
          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("feedback")}>feedback</Button>
          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [auth.signOut(), setPage("home")]}>logout</Button>

          </div>

          <br />

          {page === "home" ?
          <Home uid={user.uid} username={user.displayName} setPage={setPage} setViewTree={setViewTree} loggedIn={true} /> :
          null
          }

          {page === "upload" ?
          <UploadTreeForm uid={user.uid} username={user.displayName} /> :
          null
          }

          {page === "profile" ?
          <Profile uid={user.uid} username={user.displayName} setPage={setPage} setViewTree={setViewTree} /> :
          null
          }

          {page === "feedback" ?
          <Feedback username={user.displayName} /> :
          null
          }

          {page === "tree" ?
          <PublicTree uid={user.uid} username={user.displayName} psudeoId={viewTree.psudeoId}/> :
          null
          }


          <br />
          <Typography variant="caption" display="block" align="right" color="secondary" > comTree &copy; 2021 </Typography>

        </div>
      )
      
      
    }

    else {
      return(
        <Home loggedIn={false} />
      )
    }


   

      
  }
    

export default Main