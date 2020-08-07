import React from "react"

class Gif extends React.Component {
  constructor() {
    super()
    this.state = {
      gifData: {},
      loading: true
    }

  }


  componentDidMount() {


    console.log(this.props.name)
    fetch("http://api.giphy.com/v1/stickers/search?q=" + this.props.name + "&api_key=kyHgaR81066JAf3kfzs0pTY5Ss47kVbe&limit=1")
      .then(response => response.json())
      .then(data => {
        this.setState({
          gifData: data,
          loading: false
          
        })
      })
  }


  render() {

    console.log(this.state.gifData)

    if (this.state.gifData){
      return (
        <div><iframe src={this.state.gifData.data[0].embed_url} width="50%" height="100%" className="giphy-embed"></iframe>
        </div>
      )
    }
    else {
      return (
          <h1>{this.props.name}</h1>
      )
    }

    /*

    console.log(this.state.gifData)
    console.log(this.props.name)
    if (!this.state.loading){
      return (
        <div><iframe src={this.state.gifData.data[0].embed_url} width="50%" height="100%" className="giphy-embed"></iframe>
        </div>
      )
    }
    else {
      return (
          <h1>{this.props.name}</h1>
      )
    }

  */
  }
}

export default Gif