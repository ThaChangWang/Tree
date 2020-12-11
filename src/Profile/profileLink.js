
import React from "react"
import { db } from "../firebase"

import { Typography, Button, Avatar } from "@material-ui/core"


 class ProfileLink extends React.Component {
  constructor() {
    super()
    this.state = {
      profile: null
    }
    
  }

  componentDidMount() {
    db.collection("profiles").where("uid", "==", this.props.ownerId).onSnapshot(snapshot => {
      let thisProfile = null

      snapshot.docs.forEach(doc => {
          thisProfile = doc.data()
      })
      
        this.setState({
          profile: thisProfile
      })
      
    })
  }

  render() {

    if (this.state.profile) {

      const ownerstyle = {
        backgroundColor: "#FAEBD7"
      }

      return (
        <div>
        <Typography variant="h5" align="left" color="secondary" display="inline"> Owner: </Typography>
        <Button style={ownerstyle} variant="outlined" startIcon={<Avatar src={this.state.profile.imageUrl}/>}> {this.state.profile.username}
      </Button>
        </div>
      )
    }

    else {
      return (
        <Typography> Loading... </Typography>
      )
    }

  }

}

export default ProfileLink