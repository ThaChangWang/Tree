import React from "react"
import Post from "./post"
import PostDisplay from "./postDisplay"
import Comment from "./comment"
import { db } from "../firebase"

import { Typography } from "@material-ui/core"

let isMounted = false

class FullTreePage extends React.Component {
  constructor() {
    super()
    this.state = {
      posts: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    isMounted = true
    db.collection("posts").orderBy("timestamp", "desc").onSnapshot(snapshot => {
      let incomingPosts = []

      snapshot.docs.forEach(doc => {
        if(doc.data().treeId === this.props.tree.psudeoId) {
          incomingPosts.push(doc.data())
        }
      })

      if (isMounted) {
        this.setState({
        posts: incomingPosts
      })
      }
      
    })
  }

  componentWillUnmount(){
    isMounted = false
  }


  handleChange(event) {

    const {name, value} = event.target

    this.setState({[name]: value})
  }




  render() {

    const treestyle = {
        backgroundColor: "#90EE90",
      }

    let posts = this.state.posts

    return (
      <div style={treestyle}>

        <div>
          {this.props.uid === this.props.tree.owner ? 
          <Post username={this.props.username} treeId={this.props.tree.psudeoId} uid={this.props.uid} /> :
          null 
          }
        </div>

        <div>
          
          <br/>
          <hr/>
            <Typography variant="h3" color="secondary" align="center"> Posts </Typography>
          <hr/>
          {posts.length > 0 ? posts.map(post => {
            return <div key={post.psudeoId}>
            <PostDisplay post={post} />
            <Comment uid={this.props.uid} username={this.props.username} post={post} />
            </div>
          }) :
            <Typography variant="h4" color="secondary"> No Posts on Tree </Typography>}

        </div>

      </div>
    )
  }
}

export default FullTreePage