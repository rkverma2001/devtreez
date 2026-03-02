// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDYPLIKvGepGXMeWd2ih5TkftUydqtJ6E",
  authDomain: "devtreez.firebaseapp.com",
  projectId: "devtreez",
  storageBucket: "devtreez.firebasestorage.app",
  messagingSenderId: "732603224836",
  appId: "1:732603224836:web:e881862026d41daef6f651",
  measurementId: "G-9BPPVXLTE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);