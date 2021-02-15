import React from "react"
import EditProfile from "./editProfile"
import MyTrees from "./myTrees"
import { db } from "../firebase"

import { Button, Typography, Grid, Avatar } from "@material-ui/core"
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
        backgroundColor: "#FFFFF0",
        borderRadius: "15px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        paddingLeft: "10px",
        paddingRight: "10px",
        marginLeft: "10px",
        marginRight: "10px"
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
        
        <Typography variant="h2" align="center" color="secondary"> {this.props.username} </Typography>
        <hr/>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            {this.state.profile.imageUrl ? 
              <Avatar src={this.state.profile.imageUrl} alt="" style={{ height: "250px", width: "250px" }} /> :
              <Avatar src={profilePic} alt="" style={{ height: '200px', width: '200px' }} />
            }
            
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h5" align="left" color="secondary"> {this.state.profile.bio} </Typography>

          </Grid>
        </Grid>
        
        <br/>
        <Button variant="outlined" color="secondary" onClick={this.setEdit}> Edit Profile </Button> :

        <hr/>
        <Typography variant="h2" align="center" color="secondary"> Adopted Trees </Typography>
        <br/>
        <br/>
        <MyTrees suid={this.props.uid} uid={this.props.uid} username={this.props.username} />

        
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