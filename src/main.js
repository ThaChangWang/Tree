import React, { useState, useEffect } from "react"
import Login from "./login"
import Home from "./home"
import Posts from "./posts"
import UploadPost from "./uploadPost"
import TreeForm from "./treeForm"
import Adopt from "./adopt"

import { auth } from "./firebase"



function Main() {

  const [page, setPage] = useState("adopt")
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
          <button style={mystyle} onClick={() => setPage("adopt")}>adopt</button>
      

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
          <button style={mystyle} onClick={() => setPage("adopt")}>adopt</button>

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
          <button style={mystyle} onClick={() => setPage("adopt")}>adopt</button>

          {user ? 
          (<button style={mystyle} onClick={() => auth.signOut()}>logout</button>) :
          (<button style={mystyle} onClick={() => setPage("login")}>login</button>)
          }

          {user ? 
          (<h1> Hello {user}</h1>) :
          (<h1> Not signed in </h1>)
          }

          {user ? 
          (<UploadPost username={user} />) :
          (<h1> Need to sign in to upload </h1>)
          }

          <Posts />


          
          

          

        </div>
      )
    }

    else if (page === "adopt") {

      return (
        <div>

          <button style={mystyle} onClick={() => setPage("home")}>home</button>
          <button style={mystyle} onClick={() => setPage("posts")}>posts</button>
          <button style={mystyle} onClick={() => setPage("adopt")}>adopt</button>

          {user ? 
          (<button style={mystyle} onClick={() => auth.signOut()}>logout</button>) :
          (<button style={mystyle} onClick={() => setPage("login")}>login</button>)
          }

          {user ? 
          (<h1> Hello {user}</h1>) :
          (<h1> Not signed in </h1>)
          }

          {user ? 
          (<TreeForm username={user} />) :
          (<h1> Need to sign in to upload </h1>)
          }

          <Adopt />


        </div>
      )
    }
    
  
    
  }
    


export default Main