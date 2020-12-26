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
        border: "4px solid brown",
        paddingLeft: "10px",
        paddingRight: "10px"
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
          <Grid item xs={6}>
            {this.state.profile.imageUrl ? 
              <img src={this.state.profile.imageUrl} alt="" width="100%" /> :
              <img src={profilePic} alt="" width="100%" />
            }
            
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h2" align="left" color="secondary"> Acorns: {this.state.profile.acorns} </Typography>
          </Grid>
        </Grid>
        
        <Typography variant="h5" align="left" color="secondary"> {this.state.profile.bio} </Typography>
        <br/>
        {this.props.main ?
        <Button variant="outlined" color="secondary" onClick={this.setEdit}> Edit Profile </Button> :
        null
        }
        

        <hr/>
        <Typography variant="h2" align="center" color="secondary"> Adopted Trees </Typography>
        <hr/>
        <MyTrees uid={this.props.uid} username={this.props.username} main={this.props.main}/>

        
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