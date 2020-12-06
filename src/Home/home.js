import React, { useState, useEffect } from "react"
import QuoteDay from "./quoteDay"
import TreeDay from "./treeDay"
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
    
      var dateObj = new Date()
      var month = dateObj.getMonth() + 1
      var day = dateObj.getDate()
      var year = dateObj.getFullYear()

      setDateNum(year + month + day)

    }, [])

    const treeofthedaystyle = {
      border: "4px solid green",
      backgroundColor: "#90EE90",
      textAlign: "center"
    }

    const messagestyle = {
      backgroundColor: "#F0E68C",
      border: "4px solid blue",
      paddingLeft: "10px",
      paddingRight: "10px"
    }

    if (props.loggedIn) {

      return (
      <div>
      <br />
        {dateNum ? 
        <QuoteDay random={dateNum}/> :
        null
        }
        {dateNum ?
          <Grid container spacing={0}>
          <Grid item xs={5}>
            <div style={messagestyle}>
              <Typography variant="h5" color="secondary" align="left"> Welcome to Public Tree! </Typography>
              <br/>
              <Typography variant="h5" color="secondary" align="left"> Our goal is to provide people with a vehicle to adopt and care for public trees in their communities. </Typography>
              <br/>
              <Typography variant="h5" color="secondary" align="left"> Take a look around. Upload a tree in your community that needs care. Adopt a tree that you wish to help. </Typography>
              <br/>
              <Typography variant="h5" color="secondary" align="left"> Plant a public tree and document its life. </Typography>
              <br/>
              <Typography variant="h5" color="secondary" align="left"> Make sure your images are static. (.jpeg / .png) </Typography>
              <br/>
              <Typography variant="h5" color="secondary" align="left"> Check back often. Make suggestions. We want to make this as user friendly as possible. </Typography>
              <br/>
              <Typography variant="h5" color="secondary" align="left"> Peace, </Typography>
              <br/>
              <Typography variant="h5" color="secondary" align="left"> Public Tree </Typography>
            </div>
          </Grid>
          <Grid item xs={7}>
          <div style={treeofthedaystyle}>
            <img src={star} alt="" height="50" width="50" />
            <Typography className={classes.treeofday} variant="h3" color="secondary"> Tree Spotlight </Typography>
            <img src={star} alt="" height="50" width="50" />
          </div>
            <TreeDay uid={props.uid} username={props.username} random={dateNum} />
          </Grid>
        </Grid> :
        null }
        
      </div>
    )

    }

    else {

      return (
      <div>
      <br/>
        {dateNum ? 
        <QuoteDay random={dateNum}/> :
        null
        }
          <div style={messagestyle}>
            <Typography variant="h5" color="secondary" align="left"> Welcome to Community Tree! </Typography>
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
            <Typography variant="h5" color="secondary" align="left"> Community Tree </Typography>
          </div>
        
      </div>
    )

    }
    
  }

export default Home