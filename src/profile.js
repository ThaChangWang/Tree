import React from "react"
import UpdateProfile from "./updateProfile"
import MyTrees from "./myTrees"
import { db } from "./firebase"

import Grid from "@material-ui/core/Grid"

import { Button, Typography } from "@material-ui/core"

class Profile extends React.Component {
  constructor() {
    super()
    this.state = {
      profilePic: "",
      bio: "",
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
    db.collection("profiles").where("uid", "==", this.props.uid)
    .get()
    .then((querySnapshot) => {
        let bio = ""
        let profilePic = ""
        querySnapshot.forEach((doc) => {
            //console.log(doc.id, " => ", doc.data())
            bio = doc.data().bio
            profilePic = doc.data().imageUrl
        })
        this.setState({
              bio: bio,
              profilePic: profilePic
            })

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error)
    })
  }

  

  

  

  render() {


    const biostyle = {
        color: "white",
        backgroundColor: "black",
        padding: "10px",
        height: "100px",
        width: "500px",
        fontFamily: "Arial",
        textAlign: "left"

      }

      const profilestyle = {
        backgroundColor: "#FAEBD7"
      }

    if (this.state.editing) {

      return (
      <div>
        <h2> Enter a Bio: </h2>
        <textarea style={biostyle} name="bio" value={this.state.bio} onChange={this.handleChange}></textarea>
        <br/>
        <h2> Upload a Profile Pic: </h2>
        <UpdateProfile setPage={this.props.setPage} setMessage={this.props.setMessage} uid={this.props.uid} username={this.props.username} bio={this.state.bio} />
        <br/>
        <button onClick={this.setEdit}> Back To Profile </button>     
      </div>
      )

    }

    else {

      return (
      <div style={profilestyle}>
        
        <Typography variant="h3" align="center" color="secondary"> {this.props.username} </Typography>
        <hr/>
        <Grid container spacing={12}>
          <Grid item xs={6}>
            <img src={this.state.profilePic} alt="" height="500px" width="500px" />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3" align="left" color="secondary"> $$$$$ </Typography>
          </Grid>
        </Grid>
        <Typography variant="h5" align="left" color="secondary"> {this.state.bio} </Typography>
        <Button variant="outlined" color="secondary" onClick={this.setEdit}> Edit Profile </Button>

        <hr/>
        <Typography variant="h3" align="center" color="secondary"> My Trees </Typography>
        <hr/>
        <MyTrees username={this.props.username}/>

        
      </div>
      )
      
    }
    
  }
}

export default Profile