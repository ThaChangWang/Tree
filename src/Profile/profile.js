import React from "react"
import EditProfile from "./editProfile"
import MyTrees from "./myTrees"
import { db } from "../firebase"

import { Button, Typography, Grid } from "@material-ui/core"

let isMounted = false

class Profile extends React.Component {
  constructor() {
    super()
    this.state = {
      profile: null,
      editing: false
    }
    this.setEdit = this.setEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  setEdit() {
    this.setState({
      editing: !this.state.editing
    })
  }

   handleChange(event) {

    const {name, value} = event.target

    this.setState({[name]: value})
  }

  componentDidMount() {

    isMounted = true
    db.collection("profiles").where("uid", "==", this.props.uid)
    .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
            console.log(doc.data())
            if (isMounted) {
              this.setState({
              profile: doc.data(),
              editing: false
              })
            }
            
        })
    });

  }

  componentWillUnmount(){
    isMounted = false
  }

  

  render() {

      const profilestyle = {
        backgroundColor: "#FAEBD7"
      }

    if (this.state.editing) {

      return (
      <div>
        <EditProfile bio={this.state.profile.bio} setEdit={this.setEdit} uid={this.props.uid}/>
        <br/>
        <hr/>
        <Button variant="outlined" color="secondary" onClick={this.setEdit}> Back to Profile </Button>   
      </div>
      )

    }

    else if (this.state.profile) {

      return (
      <div style={profilestyle}>
        
        <Typography variant="h3" align="center" color="secondary"> {this.props.username} </Typography>
        <hr/>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <img src={this.state.profile.imageUrl} alt="" height="500px" width="500px" />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3" align="left" color="secondary"> $$$$$ </Typography>
          </Grid>
        </Grid>
        
        <Typography variant="h3" align="left" color="secondary"> Bio: </Typography>
        <Typography variant="h5" align="left" color="secondary"> {this.state.profile.bio} </Typography>
        <br/>
        <Button variant="outlined" color="secondary" onClick={this.setEdit}> Edit Profile </Button>

        <hr/>
        <Typography variant="h3" align="center" color="secondary"> My Trees </Typography>
        <hr/>
        <MyTrees uid={this.props.uid} username={this.props.username}/>

        
      </div>
      )
      
    }

    else {

      return (
        <div>
          <Typography variant="h2" align="left" color="secondary"> Loading... </Typography>
        </div>
      )

    }
    
  }
}

export default Profile