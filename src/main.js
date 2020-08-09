import React from "react"
import Login from "./login"
import Home from "./home"
import Posts from "./posts"
import Upload from "./upload"



class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      page: "home"
    }
    
  }


  render() {

    const mystyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial",
      textAlign: "center"
    }

    if (this.state.page === "home") {

      return (
        <div>

          <button style={mystyle} onClick={() => this.setState({ page: "home" })}>home</button>
          <button style={mystyle} onClick={() => this.setState({ page: "login" })}>login</button>
          <button style={mystyle} onClick={() => this.setState({ page: "posts" })}>posts</button>


          <Home />

        </div>
      )
    }

    else if (this.state.page === "login") {

      return (
        <div>

          <button style={mystyle} onClick={() => this.setState({ page: "home" })}>home</button>
          <button style={mystyle} onClick={() => this.setState({ page: "home" })}>logout</button>
          <button style={mystyle} onClick={() => this.setState({ page: "posts" })}>posts</button>

          <br/>

          <Login />

        </div>
      )
    }

    else if (this.state.page === "posts") {

      return (
        <div>

          <button style={mystyle} onClick={() => this.setState({ page: "home" })}>home</button>
          <button style={mystyle} onClick={() => this.setState({ page: "home" })}>logout</button>
          <button style={mystyle} onClick={() => this.setState({ page: "posts" })}>posts</button>


          <br/>

          <Posts />
          <Upload />

          

        </div>
      )
    }

    
  }
}

export default Main