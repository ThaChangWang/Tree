import React from "react"
import Post from "./post"
import PostDisplay from "./postDisplay"
import Comment from "./comment"
import { db } from "./firebase"

class FullTreePage extends React.Component {
  constructor() {
    super()
    this.state = {
      posts: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  /*componentDidMount() {
    db.collection("posts").where("treeId", "==", this.props.tree.psudeoId)
    .get()
    .then((querySnapshot) => {
        let posts = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data())
            posts.push(doc.data())
        })
        this.setState({
              posts: posts
            })

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error)
    })
  }*/

  componentDidMount() {
    db.collection("posts").orderBy("timestamp", "desc").onSnapshot(snapshot => {
      console.log(snapshot.docs.map(doc => doc.data()))
      let incomingPosts = []

      snapshot.docs.forEach(doc => {
        if(doc.data().treeId === this.props.tree.psudeoId) {
          incomingPosts.push(doc.data())
        }
      })

      console.log(incomingPosts)

      this.setState({
        posts: incomingPosts
      })
    })
  }


  handleChange(event) {

    const {name, value} = event.target

    this.setState({[name]: value})
  }




  render() {

    const treestyle = {
        color: "white",
        backgroundColor: "black",
        padding: "10px",
        fontFamily: "Arial",
        textAlign: "center",
        display: "contain"

      }

      

    let posts = this.state.posts

    return (
      <div style={treestyle}>
        <div>
          {this.props.username === this.props.tree.owner ? 
          [<h2> Make a Post </h2>,
          <Post postedBy={this.props.username} treeId={this.props.tree.psudeoId} />] :
          <h2> Must be Owner to Post on Tree </h2>}
        </div>
        <div>
          <br/>
          {posts.length > 0 ? posts.map(post => {
            console.log(post)
            return [<PostDisplay key={Math.random().toString(36)} username={this.props.username} post={post} />,
            <Comment key={Math.random().toString(36)} username={this.props.username} post={post} />]
          }) :
          null }

        </div>
      </div>
    )
  }
}

export default FullTreePage