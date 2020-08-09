import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCqlMUtnbP4zqJ26Izex4TJ1h6j0aWgiKc",
  authDomain: "tree-38cba.firebaseapp.com",
  databaseURL: "https://tree-38cba.firebaseio.com",
  projectId: "tree-38cba",
  storageBucket: "tree-38cba.appspot.com",
  messagingSenderId: "599594846214",
  appId: "1:599594846214:web:52a656efb48940ad7fdb87",
  measurementId: "G-PMMHZGH8TL"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }