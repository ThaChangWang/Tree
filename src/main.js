import React, { useState, useEffect } from "react"
import Login from "./login"
import Home from "./home"
import Posts from "./posts"
import Upload from "./upload"

import { auth } from "./firebase"



function Main() {

  const [page, setPage] = useState("home")
  const [user, setUser] = useState(null)

    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function(authUser)  {
      if (authUser) {
        console.log(authUser)
        setUser(authUser.displayName)
      } else {
        setUser(null)
      }

    })

    return () => {
      unsubscribe()
    }

    }, [])

    const mystyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial",
      textAlign: "center"
    }

    console.log(user)

    if (page === "home") {

      return (
        <div>

          <button style={mystyle} onClick={() => setPage("home")}>home</button>
          <button style={mystyle} onClick={() => setPage("posts")}>posts</button>

          {user ? 
          (<button style={mystyle} onClick={() => auth.signOut()}>logout</button>, 
          <h1>{user}</h1>) :
          (<button style={mystyle} onClick={() => setPage("login")}>login</button>)
          

          }

          <Home />

        </div>
      )
      
      
    }

    else if (page === "login") {

      return (
        <div>

          <button style={mystyle} onClick={() => setPage("home")}>home</button>
          <button style={mystyle} onClick={() => setPage("login")}>login</button>
          <button style={mystyle} onClick={() => setPage("posts")}>posts</button>
          <br/>

          <Login />

        </div>
      )
    }

    else if (page === "posts") {

      return (
        <div>

          <button style={mystyle} onClick={() => setPage("home")}>home</button>
          <button style={mystyle} onClick={() => setPage("login")}>login</button>
          <button style={mystyle} onClick={() => setPage("posts")}>posts</button>


          <br/>

          <Posts />
          <Upload />

          

        </div>
      )
    }
    
  
    
  }
    


export default Main