// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcn8WFOKcDiep6TZC2HJPKVSS5ZpDGh5g",
  authDomain: "finzet1.firebaseapp.com",
  projectId: "finzet1",
  storageBucket: "finzet1.appspot.com",
  messagingSenderId: "696053866468",
  appId: "1:696053866468:web:2470a38365649c898d71f1",
  measurementId: "G-N71GHZHN9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);