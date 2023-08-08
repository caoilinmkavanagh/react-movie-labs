// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZnKBYXaCxraO_zycffiQ54BQwo5IoUpM",
  authDomain: "reactmovielabs.firebaseapp.com",
  projectId: "reactmovielabs",
  storageBucket: "reactmovielabs.appspot.com",
  messagingSenderId: "858661082743",
  appId: "1:858661082743:web:be1cbaaa25ec1e1fe81872",
  measurementId: "G-JQK8QEXKLL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
