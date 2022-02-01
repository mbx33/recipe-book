import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "pocess.env.REACT_APP_FIREBASE_KEY",
  authDomain: "sveta-s-cookbook.firebaseapp.com",
  projectId: "sveta-s-cookbook",
  storageBucket: "sveta-s-cookbook.appspot.com",
  messagingSenderId: "process.env.REACT_APP_MESSAGING_ID",
  appId: "process.env.REACT_APP_APP_ID",
};

//initialize firebase
firebase.initializeApp(firebaseConfig);

//init services

const projectFirestore = firebase.firestore();

export { projectFirestore };
