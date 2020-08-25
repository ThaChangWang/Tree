import React from "react"

import { auth } from "./firebase"


class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      signUsername: "",
      signEmail: "",
      signPassword: "",
      logEmail: "",
      logPassword: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.signUp = this.signUp.bind(this)
    this.signIn = this.signIn.bind(this)


  }


  handleChange(event) {

    const {name, value} = event.target

    this.setState({[name]: value})
  }

  signUp(event) {
    event.preventDefault()

    auth.createUserWithEmailAndPassword(this.state.signEmail, this.state.signPassword)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: this.state.signUsername,
        publicTrees: []
      })
    })
    .catch((error) => alert(error.message))

  }

  signIn(event) {
    event.preventDefault()

    auth.signInWithEmailAndPassword(this.state.logEmail, this.state.logPassword)
    .catch((error) => alert(error.message))

  }

  render() {

    const formStyle = {
      color: "white",
      backgroundColor: "green",
      padding: "10px",
      fontFamily: "Arial",
      textAlign: "center"
    }

    return (
      <div>
        <form style={formStyle}>
          Display Name:
          <input type="email" name="signUsername" value={this.state.signUsername} onChange={this.handleChange} />
          <br/>
          Email:
          <input type="email" name="signEmail" value={this.state.signEmail} onChange={this.handleChange} />
          <br/>
          Password:
          <input type="password" name="signPassword" value={this.state.signPassword} onChange={this.handleChange}/>
          <br/>
          <button type="submit" onClick={this.signUp}>sign up</button>
        </form>

        <br/>

        <form style={formStyle}>
          Email:
          <input type="email" name="logEmail" value={this.state.logEmail} onChange={this.handleChange} />
          <br/>
          Password:
          <input type="password" name="logPassword" value={this.state.logPassword} onChange={this.handleChange}/>
          <br/>
          <button type="submit" onClick={this.signIn}>login</button>
        </form>
        
        

        

      </div>
    )
  }
}

export default Login