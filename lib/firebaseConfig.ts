// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgjoFAzwFFhj5BjcTCSdCAXI7DGpG2JLU",
  authDomain: "streakify-f768e.firebaseapp.com",
  projectId: "streakify-f768e",
  storageBucket: "streakify-f768e.firebasestorage.app",
  messagingSenderId: "217452756035",
  appId: "1:217452756035:web:d4bddce210352f73c5e8f6",
  measurementId: "G-YQZ3D3DN5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);