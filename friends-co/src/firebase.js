import firebase from "firebase/app";
import "firebase/auth";

export const auth= firebase.initializeApp({
    apiKey: "AIzaSyDiT4vkMk_EMUQBCkyykcc904odxHe45X0",
    authDomain: "unichat-4adce.firebaseapp.com",
    projectId: "unichat-4adce",
    storageBucket: "unichat-4adce.appspot.com",
    messagingSenderId: "936260667634",
    appId: "1:936260667634:web:994c4e41c13b118186286b"
  }).auth();