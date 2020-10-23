import React, { useEffect, useState } from "react"
import { db } from "../firebase"

import { Typography } from '@material-ui/core'



function QuoteDay(props) {

  const [quote, setQuote] = useState("")

  useEffect(() => {

  db.collection("quotes").onSnapshot(snapshot => {

        let quotes = snapshot.docs.map(doc => doc.data())
        let todaysNum = props.random % quotes.length

        setQuote(quotes[todaysNum])

    })

  }, [props.random])

  const quotestyle = {
    backgroundColor: "#FAEBD7",
    border: "4px solid red"
  }

  return (
    <div style={quotestyle}>
      <Typography variant="h4" color="secondary" align="center"> Quote of the Day: </Typography>
      <br/>
      <Typography variant="h3" color="secondary" align="center"> {quote.quote} </Typography>
    </div>
  )
}

export default QuoteDay