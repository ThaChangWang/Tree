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
          (<button style={mystyle} onClick={() => auth.signOut()}>logout</button>) :
          (<button style={mystyle} onClick={() => setPage("login")}>login</button>)
          }

          {user ? 
          (<h1> Hello {user}</h1>) :
          (<h1> Not signed in </h1>)
          }

          <Home />

        </div>
      )
      
      
    }

    else if (page === "login") {

      return (
        <div>

          <button style={mystyle} onClick={() => setPage("home")}>home</button>
          <button style={mystyle} onClick={() => setPage("posts")}>posts</button>

          {user ? 
          (<button style={mystyle} onClick={() => auth.signOut()}>logout</button>) :
          (<button style={mystyle} onClick={() => setPage("login")}>login</button>)
          }
          
          {user ? 
          (<h1> Hello {user}</h1>) :
          (<h1> Not signed in </h1>)
          }

          <Login />

        </div>
      )
    }

    else if (page === "posts") {

      return (
        <div>

          <button style={mystyle} onClick={() => setPage("home")}>home</button>
          <button style={mystyle} onClick={() => setPage("posts")}>posts</button>

          {user ? 
          (<button style={mystyle} onClick={() => auth.signOut()}>logout</button>) :
          (<button style={mystyle} onClick={() => setPage("login")}>login</button>)
          }

          {user ? 
          (<h1> Hello {user}</h1>) :
          (<h1> Not signed in </h1>)
          }

          <Posts />


          {user ? 
          (<Upload username={user.displayName}/>) :
          (<h1> Need to sign in to upload </h1>)
          }
          

          

        </div>
      )
    }
    
  
    
  }
    


export default Main