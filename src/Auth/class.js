import React from "react"

import { auth, db } from "../firebase"

import Grid from "@material-ui/core/Grid"
import { Typography } from "@material-ui/core"


class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      signUsername: "",
      signEmail: "",
      signPassword: "",
      signConfPassword: "",

      message: "",

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

    if (this.state.signPassword === this.state.signConfPassword) {

      if (this.state.signPassword.length > 6) {

        auth.createUserWithEmailAndPassword(this.state.signEmail, this.state.signPassword)
        .then((authUser) => {
          db.collection("profiles").add({
                imageUrl: null,
                uid: authUser.user.uid,
                bio: null
              })

          authUser.user.updateProfile({
            displayName: this.state.signUsername,
          })

          this.setState({
            signUsername: "",
            signEmail: "",
            signPassword: "",
            signConfPassword: "",

            message: "Account Created, reload page to log in",
          })

        })
        .catch((error) => alert(error.message))


      }

      else {
        alert("Password must be longer than 6 characters")
      }

    }

    else {
      alert("Passwords do not match")
    }

    

  }

  signIn(event) {

    auth.signInWithEmailAndPassword(this.state.logEmail, this.state.logPassword)
    .catch((error) => alert(error.message))

    this.props.setPage("home")


  }

  render() {

    const formStyle = {
      color: "white",
      backgroundColor: "green",
      padding: "10px",
      fontFamily: "Arial",
      textAlign: "left"
    }

    return (
      <div style={formStyle}>

        <Grid container spacing={3}>
          <Grid item xs={6}>
        <Typography variant="h3"> Sign Up: </Typography>
        <br/>
        <form>
          Display Name:
          <input type="text" name="signUsername" value={this.state.signUsername} onChange={this.handleChange} />
          <br/>
          <br/>
          Email:
          <input type="email" name="signEmail" value={this.state.signEmail} onChange={this.handleChange} />
          <br/>
          <br/>
          Password:
          <input type="password" name="signPassword" value={this.state.signPassword} onChange={this.handleChange}/>
          <br/>
          <br/>
          Confirm Password:
          <input type="password" name="signConfPassword" value={this.state.signConfPassword} onChange={this.handleChange}/>
          <br/>
          <br/>
          <button type="submit" onClick={this.signUp}>sign up</button>
        </form>
          </Grid>

          <Grid item xs={6}>
        <Typography variant="h3"> Sign In: </Typography>
        <br/>
        <form>
          Email:
          <input type="email" name="logEmail" value={this.state.logEmail} onChange={this.handleChange} />
          <br/>
          <br/>
          Password:
          <input type="password" name="logPassword" value={this.state.logPassword} onChange={this.handleChange}/>
          <br/>
          <br/>
          <button type="submit" onClick={this.signIn}>login</button>
        </form>
          </Grid>
        </Grid>

        <br/>
        <h2> {this.state.message} </h2>
        
        
      </div>
    )
  }
}

export default Login