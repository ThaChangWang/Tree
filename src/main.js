import React, { useState, useEffect } from "react"
import { Button } from "@material-ui/core"
import Login from "./login"
import Home from "./home"
import UploadForm from "./uploadForm"
import AdoptMap from "./adoptMap"
import Profile from "./profile"
import "./style.css"

import { auth } from "./firebase"



function Main(props) {

  const [page, setPage] = useState(props.page)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [userId, setUserId] = useState(null)

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

    const buttonstyle = {
      color: "white",
      backgroundColor: "black",
      padding: "10px",
      fontFamily: "Arial",
      textAlign: "center"
    }
    
    const headerstyle = {
      color: "white",
      backgroundColor: "lightgreen",
      padding: "10px",
      fontFamily: "Arial",
      textAlign: "center"
    }

    console.log(user)

    if (page === "home") {

      return (
        <div>

          <div style={headerstyle}>

          <Button style={buttonstyle} onClick={() => [setPage("home"), setMessage(null)]}>home</button>
          <button style={buttonstyle} onClick={() => setPage("find")}>find</button>
          <button style={buttonstyle} onClick={() => setPage("upload")}>upload</button>

          {user ? 
          (<button style={buttonstyle} onClick={() => setPage("profile")}>profile</button>) :
          null
          }

          {user ? 
          (<button style={buttonstyle} onClick={() => auth.signOut()}>logout</button>) :
          (<button style={buttonstyle} onClick={() => setPage("login")}>login</button>)
          }

          {user ? 
          (<h1> Hello {user}</h1>) :
          (<h1> Not signed in </h1>)
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


          <button style={buttonstyle} onClick={() => [setPage("home"), setMessage(null)]}>home</button>
          <button style={buttonstyle} onClick={() => setPage("find")}>find</button>
          <button style={buttonstyle} onClick={() => setPage("upload")}>upload</button>

          {user ? 
          (<button style={buttonstyle} onClick={() => setPage("profile")}>profile</button>) :
          null
          }

          {user ? 
          (<button style={buttonstyle} onClick={() => auth.signOut()}>logout</button>) :
          (<button style={buttonstyle} onClick={() => setPage("login")}>login</button>)
          }

          {user ? 
          (<h1> Hello {user}</h1>) :
          (<h1> Not signed in </h1>)
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

          <button style={buttonstyle} onClick={() => [setPage("home"), setMessage(null)]}>home</button>
          <button style={buttonstyle} onClick={() => setPage("find")}>find</button>
          <button style={buttonstyle} onClick={() => setPage("upload")}>upload</button>

          {user ? 
          (<button style={buttonstyle} onClick={() => setPage("profile")}>profile</button>) :
          null
          }

          {user ? 
          (<button style={buttonstyle} onClick={() => auth.signOut()}>logout</button>) :
          (<button style={buttonstyle} onClick={() => setPage("login")}>login</button>)
          }

          {user ? 
          (<h1> Hello {user}</h1>) :
          (<h1> Not signed in </h1>)
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

          <button style={buttonstyle} onClick={() => [setPage("home"), setMessage(null)]}>home</button>
          <button style={buttonstyle} onClick={() => setPage("find")}>find</button>
          <button style={buttonstyle} onClick={() => setPage("upload")}>upload</button>

          {user ? 
          (<button style={buttonstyle} onClick={() => setPage("profile")}>profile</button>) :
          null
          }

          {user ? 
          (<button style={buttonstyle} onClick={() => auth.signOut()}>logout</button>) :
          (<button style={buttonstyle} onClick={() => setPage("login")}>login</button>)
          }

          {user ? 
          (<h1> Hello {user}</h1>) :
          (<h1> Not signed in </h1>)
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


          <button style={buttonstyle} onClick={() => [setPage("home"), setMessage(null)]}>home</button>
          <button style={buttonstyle} onClick={() => setPage("find")}>find</button>
          <button style={buttonstyle} onClick={() => setPage("upload")}>upload</button>

          {user ? 
          (<button style={buttonstyle} onClick={() => setPage("profile")}>profile</button>) :
          null
          }

          {user ? 
          (<button style={buttonstyle} onClick={() => auth.signOut()}>logout</button>) :
          (<button style={buttonstyle} onClick={() => setPage("login")}>login</button>)
          }

          {user ? 
          (<h1> Hello {user}</h1>) :
          (<h1> Not signed in </h1>)
          }

          </div>


         <Profile setPage={setPage} setMessage={setMessage} uid={userId} username={user}/>

        </div>
      )
    }

    
  
    
  }
    


export default Main