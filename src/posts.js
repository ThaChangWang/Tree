import React from "react"
import Post from "./post"

import { db } from "./firebase"

class Posts extends React.Component {
  constructor() {
    super()
    this.state = {
      posts: []
    }

  }

  componentDidMount() {
    db.collection("posts").onSnapshot(snapshot => {
      this.setState({posts: snapshot.docs.map(doc => doc.data())})
    })
    
  }



  render() {

    var displayPosts = this.state.posts


    return (
      <div>
        {displayPosts.length > 0 ? displayPosts.map(post => {
        return <Post username={post.username} imageUrl={post.imageUrl} caption={post.caption}/>
      }) : <h1>hey</h1> }
        
      </div>
    )
  }
}

export default Posts