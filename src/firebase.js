import firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebaseConfig'

import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'


console.log(firebase)
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

export {
  firebase,
  firebaseui,
  db,
}
