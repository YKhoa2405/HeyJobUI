import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDhfhyLNRXwps364gLOW0eR_v1rUmoMTR8",
  authDomain: "heyjob-4bde9.firebaseapp.com",
  projectId: "heyjob-4bde9",
  storageBucket: "heyjob-4bde9.appspot.com",
  messagingSenderId: "103107320213",
  appId: "1:103107320213:web:37d755dddbf7382ada7e9c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const storeDb = getFirestore(app)

export {auth, storeDb}


