import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6HAd-wtEYYLzw42WdZaFDCP17V_0p0XQ",
  authDomain: "meditation-app-new.firebaseapp.com",
  projectId: "meditation-app-new",
  storageBucket: "meditation-app-new.appspot.com",
  messagingSenderId: "604181091303",
  appId: "1:604181091303:web:8a227c412c164a2d5e6342",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
