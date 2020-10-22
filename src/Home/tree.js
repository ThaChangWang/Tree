import React, { useEffect, useState } from "react"
import PublicTree from "../Profile/publicTree"
import { db } from "../firebase"

function Tree(props) {

  const [tree, setTree] = useState(null)

  useEffect(() => {

  db.collection("publicTrees").onSnapshot(snapshot => {

        let trees = snapshot.docs.map(doc => doc.data())
        let todaysNum = props.random % trees.length
 
        setTree(trees[todaysNum])

    })

  }, [props.random])


  return (
    <div>
      {tree ? 
      <PublicTree uid={props.uid} username={props.username} psudeoId={tree.psudeoId} height="300" width="300" /> :
      null}
    </div>
  )
}

export default Tree