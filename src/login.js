import React from "react"


class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: ""
    }
    this.handleChange = this.handleChange.bind(this)

  }


  handleChange(event) {

    const {name, value} = event.target

    this.setState({[name]: value})
  }

  render() {
    return (
      <div>
        Username:
        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        <br/>
        Password:
        <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
        <br/>

        

      </div>
    )
  }
}

export default Login