import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5wO7-j_ZKdHC2cldzH1kmDrPq8j2ajnA",
  authDomain: "meditation-app-f7b6a.firebaseapp.com",
  projectId: "meditation-app-f7b6a",
  storageBucket: "meditation-app-f7b6a.appspot.com",
  messagingSenderId: "508295680389",
  appId: "1:508295680389:web:4bdbde9cad4fa1980474ec",
  measurementId: "G-RD05GM0RHM",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
