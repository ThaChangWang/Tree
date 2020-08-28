import React from "react"
import AdoptMap from "./adoptMap.js"


class Adopt extends React.Component {


  render() {


    return (
      <div>
        <h2> Adopt a Tree </h2>
        <AdoptMap height="100vh" width="100%" lat={47.7511} lng={-120.7401} zoom={6} />
       
        
      </div>
    )
  }
}

export default Adopt