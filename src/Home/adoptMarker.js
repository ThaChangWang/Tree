import React from "react"

import { Button } from "@material-ui/core"

function AdoptMarker(props) {


    let adoptstyle

    if (props.tree.owner === props.uid) {
      adoptstyle = {
        color: "white",
        backgroundColor: "blue",
        textAlign: "center",
        width: "30px",
        height: "20px"
      }

      return (
        <div>
          <img src={props.tree.imageUrl} alt="" width="62" />
          <Button variant="outlined" style={adoptstyle} onClick={() => [props.setViewTree(props.tree),
          props.setPage("tree")]}> Hugging </Button>
        </div>
      )
    }
      
    else if (props.tree.owner) {
      adoptstyle = {
        color: "white",
        backgroundColor: "green",
        textAlign: "center",
        width: "30px",
        height: "20px"
      }

      return (
        <div>
          <img src={props.tree.imageUrl} alt="" width="62" />
          <Button variant="outlined" style={adoptstyle} onClick={() => [props.setViewTree(props.tree),
          props.setPage("tree")]}> Hugged </Button>
        </div>
    )
    }
    else {
      adoptstyle = {
        color: "brown",
        backgroundColor: "yellow",
        textAlign: "center",
        width: "30px",
        height: "40px"
      }

      return (
        <div>
          <img src={props.tree.imageUrl} alt="" width="62" />
          <Button variant="outlined" style={adoptstyle} onClick={() => [props.setViewTree(props.tree),
          props.setPage("tree")]}> Needs a Hug </Button>
        </div>
    )
    }
    
  }


export default AdoptMarker
