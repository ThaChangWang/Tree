import React from "react"

import { storage } from "./firebase"

class Upload extends React.Component {
  constructor() {
    super()
    this.state = {
      files: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)

  }

  handleChange(files) {
    this.setState({files: files})
    
    
  }

  handleUpload() {
    let bucketName = "images"
    let file = this.state.files[0]
    let storageRef = storage.ref(bucketName + '/' + file.name)
    let uploadTask = storageRef.put(file)
    uploadTask.on(storage.TaskEvent.STATE_CHANGED, () => {
      let downloadURL = uploadTask.snapshot.downloadURL
      console.log(downloadURL)
    })


  }

  render() {
    return (
      <div>
        <input type="file" onChange={(e) => {this.handleChange(e.target.files)}} />
        <button onClick={this.handleUpload}>upload</button>
        

      </div>
    )
  }
}

export default Upload