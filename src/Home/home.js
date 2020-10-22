import React, { useState, useEffect } from "react"
import Quote from "./quote"
import Tree from "./tree"
import star from "../images/star.png"

import { Typography, Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
 
  treeofday: {
    display: "inline"
  }

})

function Home(props) {

    const [dateNum, setDateNum] = useState(null)

    const classes = useStyles()

    useEffect(() => {
    
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();

      setDateNum(year + month + day)

    }, [])

    const treeofthedaystyle = {
      border: "4px dotted red",
      backgroundColor: "#FAEBD7",
      textAlign: "center"
    }

    return (
      <div>
      <br/>
        {dateNum ? 
        <Quote random={dateNum}/> :
        null
        }
        <hr/>
        {dateNum ?
          <Grid container spacing={4}>
          <Grid item xs={5}>
            <Typography variant="h5" color="secondary" align="left"> Welcome to Public Tree! </Typography>
            <br/>
            <Typography variant="h5" color="secondary" align="left"> Our goal is to provide people with a vehicle to adopt and care for public trees in their communities. </Typography>
            <br/>
            <Typography variant="h5" color="secondary" align="left"> Take a look around. Upload a tree in your community that needs care. Adopt a tree that you wish to help. </Typography>
            <br/>
            <Typography variant="h5" color="secondary" align="left"> Plant a public tree and document its life. </Typography>
            <br/>
            <Typography variant="h5" color="secondary" align="left"> Check back often. Make suggestions. We want to make this as user friendly as possible. </Typography>
            <br/>
            <Typography variant="h5" color="secondary" align="left"> Peace, </Typography>
            <br/>
            <Typography variant="h5" color="secondary" align="left"> Public Tree </Typography>
          </Grid>
          <Grid item xs={7}>
          <div style={treeofthedaystyle}>
            <img src={star} alt="" height="50" width="50" />
            <Typography className={classes.treeofday} variant="h3" color="secondary"> Tree of the Day! </Typography>
            <img src={star} alt="" height="50" width="50" />
          </div>
            <Tree uid={props.uid} username={props.displayName} random={dateNum} />
          </Grid>
        </Grid> :
        null }
        
      </div>
    )
  }

export default Home