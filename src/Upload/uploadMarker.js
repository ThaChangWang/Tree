import React from "react"


class UploadMarker extends React.Component {

  render() {

      return (
      <div>
        <img src={this.props.imageUrl} alt="" height="50" width="50" />
      </div>
      )
    
    
  }
}

export default UploadMarker
