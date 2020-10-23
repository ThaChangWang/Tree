import React, { useEffect, useState } from "react"
import PublicTree from "../Profile/publicTree"
import { db } from "../firebase"

function TreeDay(props) {

  const [tree, setTree] = useState(null)

  useEffect(() => {

  const unsubscribe = db.collection("publicTrees").onSnapshot(snapshot => {

        let trees = snapshot.docs.map(doc => doc.data())
        let todaysNum = props.random % trees.length
 
        setTree(trees[todaysNum])

    })

    return () => {
      unsubscribe()
    }

  }, [props.random])


  return (
    <div>
      {tree ? 
      <PublicTree uid={props.uid} username={props.username} psudeoId={tree.psudeoId} height="300" width="300" /> :
      null}
    </div>
  )
}

export default TreeDay