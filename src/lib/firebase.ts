// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiAExVxKEgYSfM14GXKiRCnGuW15cI9AA",
  authDomain: "kos-hunter-3f571.firebaseapp.com",
  projectId: "kos-hunter-3f571",
  storageBucket: "kos-hunter-3f571.firebasestorage.app",
  messagingSenderId: "129028936422",
  appId: "1:129028936422:web:f4754fb9a11d152e6b2127",
  measurementId: "G-7Y7C0TQ8DT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);