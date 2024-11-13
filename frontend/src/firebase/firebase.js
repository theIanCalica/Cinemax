// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrqfZ6vWYgPLZi07yCUH-r7qBhAZ9h32k",
  authDomain: "cinemax-2e7c7.firebaseapp.com",
  projectId: "cinemax-2e7c7",
  storageBucket: "cinemax-2e7c7.firebasestorage.app",
  messagingSenderId: "9306587746",
  appId: "1:9306587746:web:de25183fc9de2770fd473b",
  measurementId: "G-7HL4PY1E6K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
