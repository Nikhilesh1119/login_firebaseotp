// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARj3Yvd_s0lx0jXKmjKCgPdi9zgaqB3LU",
  authDomain: "login-form-with-otp.firebaseapp.com",
  projectId: "login-form-with-otp",
  storageBucket: "login-form-with-otp.appspot.com",
  messagingSenderId: "48581946294",
  appId: "1:48581946294:web:08f7fdfa816e3b6fb82f17",
  measurementId: "G-ZG0R6XCREX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);