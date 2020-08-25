import React, { useState, useEffect } from "react"
import Map from "./map"

import firebase from "firebase"
import { db, storage } from "./firebase"

function UploadTree(props) {

  const [descrip, setDescrip] = useState("")
  const [type, setType] = useState("")
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState(null)

  const [lat, setLat] = useState("")
  const [lng, setLng] = useState("")
  const [zoom, setZoom] = useState(10)
  const [center, setCenter] = useState(null)
  const [srcStr, setSrcStr] = useState("")
  const [located, setLocated] = useState(false)

  const [map, setMap] = useState(null)
  const [marker, setMarker] = useState(null)



  /*useEffect(() => {
    if (!located) {
      if ("geolocation" in navigator) {
      console.log("Available")
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude)
        console.log("Longitude is :", position.coords.longitude)
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)

        if (lat !== "" && lng !== "") {
          
          setSrcStr("https://www.google.com/maps/embed/v1/view?key=AIzaSyBiB3iNngJM_kFWKxSv9a30O3fww7YTiWA&center=" + lat + "," + lng + "&zoom=18")
          setLocated(true)
          console.log(srcStr)
        }
        

    })
    } else {
      console.log("Not Available")
    }
    }
    

  },)*/



  if (!located) {
    if ("geolocation" in navigator) {
      console.log("Available")
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords)
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)
        setCenter({lat : lat, lng : lng})
        setLocated(true)
        
    })
      
  } else {
      console.log("Not Available")
    }

  }

  const handleChange = (e) => {
    if(e.target.files[0]) {
      setImage(e.target.files[0])
      console.log(image)
    }
  }

  const handleUpload = () => {
    const uploadTask = storage.ref("images/" + image.name).put(image)

    uploadTask.on("state_changed", (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      setProgress(progress)
    },
    (error) => {
      alert(error.message)
    },
    () => {
      storage.ref("images").child(image.name).getDownloadURL().then(url => {
        db.collection("publicTrees").add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          owner: "public",
          imageUrl: url,
          username: props.username,
          description: descrip,
          type: type
        })
      })
        setProgress(0)
        setDescrip("")
        setType("")
        setImage(null)
    }
    )

  }

    return (
      <div>
        <progress value={progress} max="100" />
        <br/>
        <input type="text" placeholder="Enter the tree classification.." onChange={event => setType(event.target.value)} value={type} />
        <br/>
        <input type="text" placeholder="Enter a description" onChange={event => setDescrip(event.target.value)} value={descrip} />
        <br/>
        <input type="file" onChange={handleChange}/>
        <br/>
        <input type="text" placeholder="Latitude" onChange={event => setLat(event.target.value)} value={lat} />
        <input type="text" placeholder="Longitude" onChange={event => setLng(event.target.value)} value={lng} />
        <button onClick={handleUpload}> Upload </button>
        
        <Map lat={lat} lng={lng} zoom={zoom}/>

      </div>
    )
    


  

    
}

export default UploadTree