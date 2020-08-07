import React from "react"
import Login from "./login"
import Home from "./home"

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      page: "home"
    }
  }


  render() {

    if (this.state.page === "home") {

      return (
        <div>

          <button onClick={() => this.setState({ page: "home" })}>home</button>
          <button onClick={() => this.setState({ page: "about" })}>about</button>
          <button onClick={() => this.setState({ page: "projects" })}>projects</button>

          <Home />

        </div>
      )
    }

    else if (this.state.page === "about") {

      return (
        <div>

          <button onClick={() => this.setState({ page: "home" })}>home</button>
          <button onClick={() => this.setState({ page: "about" })}>about</button>
          <button onClick={() => this.setState({ page: "projects" })}>projects</button>

          <Login />

        </div>
      )
    }

    else if (this.state.page === "projects") {

      return (
        <div>

          <button onClick={() => this.setState({ page: "home" })}>home</button>
          <button onClick={() => this.setState({ page: "about" })}>about</button>
          <button onClick={() => this.setState({ page: "projects" })}>projects</button>

          <h1>{this.state.page}</h1>        

        </div>
      )
    }

    
  }
}

export default Main