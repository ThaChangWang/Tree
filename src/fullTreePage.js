import React from "react"
import Post from "./post"
import PostDisplay from "./postDisplay"
import Comment from "./comment"
import { db } from "./firebase"

class FullTreePage extends React.Component {
  constructor() {
    super()
    this.state = {
      description: "",
      posts: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    db.collection("posts").where("props.treeId", "==", this.props.tree.psudeoId)
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

      const criptstyle = {
        color: "white",
        backgroundColor: "black",
        padding: "10px",
        height: "100px",
        width: "500px",
        fontFamily: "Arial",
        textAlign: "left"

      }

    let posts = this.state.posts

    return (
      <div style={treestyle}>
        <div>
          {this.props.username === this.props.tree.props.owner ? 
          [<h2> Make a Post </h2>,
          <textarea style={criptstyle} placeholder="Enter a description..." name="description" onChange={this.handleChange} value={this.state.description}></textarea>,
          <Post db="posts" description={this.state.description} treeId={this.props.tree.psudeoId} />] :
          <h2> Must be Owner to Post on Tree </h2>}
        </div>
        <div>
          {posts.length > 0 ? posts.map(post => {
            return [<PostDisplay post={post} />,
            <Comment postId={post.psudeoId} />]
          }) :
          null }

        </div>
      </div>
    )
  }
}

export default FullTreePage