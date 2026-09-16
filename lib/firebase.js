// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLFz45GgkjqdTNXV5GdFOncXUnIxdJ6QA",
  authDomain: "rigour-group.firebaseapp.com",
  projectId: "rigour-group",
  storageBucket: "rigour-group.firebasestorage.app",
  messagingSenderId: "799216483505",
  appId: "1:799216483505:web:9e4cefe89fae44abbbb690"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);