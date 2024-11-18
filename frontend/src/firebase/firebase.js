// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";

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
const messaging = getMessaging(app);

export { app, auth, messaging };
