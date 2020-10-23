import React from "react"
import EditProfile from "./editProfile"
import MyTrees from "./myTrees"
import { db } from "../firebase"

import { Button, Typography, Grid } from "@material-ui/core"
import profilePic from "../images/profilePic.png"

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
        backgroundColor: "#FAEBD7",
        paddingLeft: "20px",
        paddingRight: "20px"
      }

    if (this.state.editing) {

      return (
      <div>
        <EditProfile bio={this.state.profile.bio} setEdit={this.setEdit} uid={this.props.uid}/>
        <br/>
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
          <Grid item style={profilestyle} xs={6}>
            {this.state.profile.imageUrl ? 
              <img src={this.state.profile.imageUrl} alt="" height="500px" width="500px" /> :
              <img src={profilePic} alt="" height="500px" width="500px" />
            }
            
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3" align="left" color="secondary"> Souvenirs </Typography>
          </Grid>
        </Grid>
        
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