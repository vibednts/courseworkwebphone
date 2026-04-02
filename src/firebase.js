// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsv6cEOZX-82_-QRjjfqSypAdc5QuyJVM",
  authDomain: "phonebook-c7aa8.firebaseapp.com",
  projectId: "phonebook-c7aa8",
  storageBucket: "phonebook-c7aa8.firebasestorage.app",
  messagingSenderId: "106807621461",
  appId: "1:106807621461:web:ca827d7d4be31ee9bfe1dc",
  measurementId: "G-XNQX5Q4HD7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();