// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPurVeVYr4Yrym5BjKKKzn9uTQHu_reg4",
  authDomain: "elephatrack.firebaseapp.com",
  projectId: "elephatrack",
  storageBucket: "elephatrack.appspot.com",
  messagingSenderId: "1037462377249",
  appId: "1:1037462377249:web:5c1873f6e71b50b78a6460",
  measurementId: "G-0M6ND33W76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;