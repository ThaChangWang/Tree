import React from 'react'
import ReactDOM from 'react-dom'
import Main from './main'
import Theme from "./theme"
import { ThemeProvider } from "@material-ui/core/styles"

import * as serviceWorker from './serviceWorker'

ReactDOM.render(

    <ThemeProvider theme={Theme} >
      <Main page="home" />
    </ThemeProvider>,
  document.getElementById("root")

)

serviceWorker.unregister()
