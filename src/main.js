import React, { useState, useEffect } from "react"

import { Button, Typography, makeStyles } from "@material-ui/core"

import Home from "./Home/home"
import Feedback from "./Home/feedback"
import UploadTreeForm from "./Upload/uploadTreeForm"
import Profile from "./Profile/profile"
import PublicTree from "./Profile/publicTree"

import "./style.css"

import { auth } from "./firebase"

const useStyles = makeStyles({
  
  buttonStyle: {
    backgroundColor: "#FFFFF0"
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

    if (page === "home") {

      return (
        <div>

          <div style={headerstyle}>

          {user ? 
          <Typography className={classes.title} gutterBottom variant="h2" align="center" color="secondary"> comTree </Typography> :
          null
          }
          
          <br/>
          <br/>

          {user ?
          <Button className={classes.clickedButtonStyle} variant="outlined" color="secondary" onClick={() => setPage("home")}>home</Button> :
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
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("feedback")}>feedback</Button>) :
          null
          }

           {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [auth.signOut(), setPage("home")]}>logout</Button>) :
          null
          }

          </div>

          {user ?
          <Home uid={user.uid} username={user.displayName} setPage={setPage} setViewTree={setViewTree} loggedIn={true} /> :
          <Home loggedIn={false} />
          }

          <br />
          <Typography variant="caption" display="block" align="right" color="secondary" > comTree &copy; 2021 </Typography>

        </div>
      )
      
      
    }


    else if (page === "upload") {


      return (
        <div>

          <div style={headerstyle}>

          {user ? 
          <Typography className={classes.title} gutterBottom variant="h2" align="center" color="secondary"> comTree </Typography> :
          null
          }

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

          <br />
          <Typography variant="caption" display="block" align="right" color="secondary" > comTree &copy; 2021 </Typography>

        </div>
      )
    }

    else if (page === "profile") {


      return (
        <div>

          <div style={headerstyle}>

          {user ? 
          <Typography className={classes.title} gutterBottom variant="h2" align="center" color="secondary"> comTree </Typography> :
          null
          }

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

        <Profile uid={user.uid} username={user.displayName} setPage={setPage} setViewTree={setViewTree} />

        <br />
          <Typography variant="caption" display="block" align="right" color="secondary" > comTree &copy; 2021 </Typography>

        </div>
      )
    }

    else if (page === "feedback") {


      return (
        <div>

          <div style={headerstyle}>

          {user ? 
          <Typography className={classes.title} gutterBottom variant="h2" align="center" color="secondary"> comTree </Typography> :
          null
          }

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

          <br />
          <Typography variant="caption" display="block" align="right" color="secondary" > comTree &copy; 2021 </Typography>


        </div>
      )
    }

    else if (page === "tree") {

      return (
        <div>

          <div style={headerstyle}>

         {user ? 
          <Typography className={classes.title} gutterBottom variant="h2" align="center" color="secondary"> comTree </Typography> :
          null
          }

          <br/>
          <br/>

          {user ?
          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("home")}>home</Button> :
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
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("feedback")}>feedback</Button>) :
          null
          }

           {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [auth.signOut(), setPage("home")]}>logout</Button>) :
          null
          }

          </div>
          <br />

          <PublicTree uid={user.uid} username={user.displayName} psudeoId={viewTree.psudeoId}/>

          <br />
          <Typography variant="caption" display="block" align="right" color="secondary" > comTree &copy; 2021 </Typography>

        </div>
      )
    }

      
  }
    

export default Main