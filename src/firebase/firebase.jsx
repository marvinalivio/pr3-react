// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlzH_9IWkjkvmIq_J9gyQWOfvWr8U4uPM",
  authDomain: "flixten-fe4ef.firebaseapp.com",
  projectId: "flixten-fe4ef",
  storageBucket: "flixten-fe4ef.appspot.com",
  messagingSenderId: "234831007559",
  appId: "1:234831007559:web:9c4400a6f153cc14e08662",
  measurementId: "G-8RBBCS8HJY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)
export {db, app, auth };