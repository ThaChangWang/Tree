import React from "react"
import UploadImage from "./uploadImage"
import { db } from "./firebase"

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
    console.log(this.props.username)
    db.collection("profiles").where("props.username", "==", this.props.username)
    .get()
    .then((querySnapshot) => {
        let bio = ""
        let profilePic = ""
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data())
            bio = doc.data().props.bio
            profilePic = doc.data().imageUrl
        })
        console.log(bio, profilePic)
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

    if (this.state.editing) {

      return (
      <div>
        <h2> Enter a Bio: </h2>
        <textarea style={biostyle} name="bio" value={this.state.bio} onChange={this.handleChange}></textarea>
        <br/>
        <h2> Upload a Profile Pic: </h2>
        <UploadImage db="profiles" username={this.props.username} bio={this.state.bio} />
        <br/>
        <button onClick={this.setEdit}> Back To Profile </button>

        

        
      </div>
      )

    }

    else {

      return (
      <div>
        <h2> {this.props.username} </h2>
        <br/>
        <img src={this.state.profilePic} alt="" height="500" width="500" />
        <br/>
        <h4> {this.state.bio} </h4>
        <br/>
        <button onClick={this.setEdit}> Edit Profile </button>
      </div>
      )
      
    }
    
  }
}

export default Profile