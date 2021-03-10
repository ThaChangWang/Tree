import React from "react"

import { Avatar, IconButton } from "@material-ui/core"

function AdoptMarker(props) {


    let adoptstyle

    if (props.tree.huggedBy.includes(props.uid)) {
      adoptstyle = {
        border: "2px solid blue",
        width: props.width,
        height: props.width
      }

    }

    else if (props.tree.length > 0) {
      adoptstyle = {
        border: "2px solid green",
        width: props.width,
        height: props.width
        

      }

    }

    else {
      adoptstyle = {
        border: "2px solid red",
        width: props.width,
        height: props.width

      }

    }

      return (
        <div>
          <IconButton onClick={() => [props.setViewTree(props.tree),
          props.setPage("tree")]} >
            <Avatar src={props.tree.imageUrl} style={adoptstyle}/>
          </IconButton>
        </div>
    )
    
  }


export default AdoptMarker
