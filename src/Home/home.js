import React, { useState, useEffect } from "react"
import AdoptMap from "./adoptMap"

import { Typography } from '@material-ui/core'

function Home(props) {

    const [dateNum, setDateNum] = useState(null)

    useEffect(() => {
    
      var dateObj = new Date()
      var month = dateObj.getMonth()
      var day = dateObj.getDate()
      var year = dateObj.getFullYear()

      setDateNum(year + month + day)

    }, [])

    const messagestyle = {
      backgroundColor: "#FAEBD7",
      border: "4px solid brown",
      paddingLeft: "10px",
      paddingRight: "10px"
    }

    console.log(dateNum)

    if (props.loggedIn) {

      return (
      <div>
      <br />
        <AdoptMap uid={props.uid} username={props.username} />      
      </div>
    )

    }

    else {

      return (
      <div>
      <br/>
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
            <Typography variant="h5" color="secondary" align="left"> Login to view the community driven site! </Typography>
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