import React, { useState, useEffect } from "react"
import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Login from "./login"
import Home from "./home"
import UploadForm from "./uploadForm"
import AdoptMap from "./adoptMap"
import Profile from "./profile"
import "./style.css"

import { auth } from "./firebase"

const useStyles = makeStyles({
  buttonStyle: {
    backgroundColor: "green"
  },
  clickedButtonStyle: {
    backgroundColor: "black"
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



          <Button className={classes.clickedButtonStyle} variant="outlined" color="secondary" onClick={() => [setPage("home"), setMessage(null)]}>home</Button>
          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("find")}>find</Button>
          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>profile</Button>) :
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


          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [setPage("home"), setMessage(null)]}>home</Button>
          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("find")}>find</Button>
          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>profile</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => auth.signOut()}>logout</Button>) :
          (<Button className={classes.clickedButtonStyle} variant="outlined" color="secondary" onClick={() => setPage("login")}>login</Button>)
          }

          </div>


          <Login />

        </div>
      )
    }

    

    else if (page === "find") {

      return (
        <div>

          <div style={headerstyle}>

          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [setPage("home"), setMessage(null)]}>home</Button>
          <Button className={classes.clickedButtonStyle} variant="outlined" color="secondary" onClick={() => setPage("find")}>find</Button>
          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>profile</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => auth.signOut()}>logout</Button>) :
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("login")}>login</Button>)
          }


          </div>


          

          <AdoptMap username={user} height="100vh" width="100%" lat={47.7511} lng={-120.7401} zoom={6} />



        </div>
      )
    }

    else if (page === "upload") {


      return (
        <div>

          <div style={headerstyle}>

          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [setPage("home"), setMessage(null)]}>home</Button>
          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("find")}>find</Button>
          <Button className={classes.clickedButtonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>profile</Button>) :
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


          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => [setPage("home"), setMessage(null)]}>home</Button>
          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("find")}>find</Button>
          <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>

          {user ? 
          (<Button className={classes.clickedButtonStyle} variant="outlined" color="secondary" onClick={() => setPage("profile")}>profile</Button>) :
          null
          }

          {user ? 
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => auth.signOut()}>logout</Button>) :
          (<Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("login")}>login</Button>)
          }


          </div>


         <Profile setPage={setPage} setMessage={setMessage} uid={userId} username={user}/>

        </div>
      )
    }

    
  
    
  }
    

export default Main