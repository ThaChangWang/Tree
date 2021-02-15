import React from "react"

import { Button, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  
  button: {
   width: 5,
   height: 20
  }

}))

function AdoptMarker(props) {

    const classes = useStyles()

    let adoptstyle

    if (props.tree.owner === props.uid) {
      adoptstyle = {
        color: "white",
        backgroundColor: "blue",
        textAlign: "center"
      }

      return (
        <div>
          <img src={props.tree.imageUrl} alt="" width="62" />
          <Button variant="outlined" className={classes.button} style={adoptstyle} onClick={() => [props.setViewTree(props.tree),
          props.setPage("tree")]}> Owner  </Button>
        </div>
      )
    }
      
    else if (props.tree.owner) {
      adoptstyle = {
        color: "white",
        backgroundColor: "green",
        textAlign: "center"
      }

      return (
        <div>
          <img src={props.tree.imageUrl} alt="" width="62" />
          <Button variant="outlined" size="small" className={classes.button} style={adoptstyle} onClick={() => [props.setViewTree(props.tree),
          props.setPage("tree")]}> Owned </Button>
        </div>
    )
    }
    else {
      adoptstyle = {
        color: "brown",
        backgroundColor: "yellow",
        textAlign: "center"
      }

      return (
        <div>
          <img src={props.tree.imageUrl} alt="" width="62" />
          <Button variant="outlined" className={classes.button} style={adoptstyle} onClick={() => [props.setViewTree(props.tree),
          props.setPage("tree")]}> Orphan </Button>
        </div>
    )
    }
    
  }


export default AdoptMarker
