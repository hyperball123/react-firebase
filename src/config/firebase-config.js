// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtlSmuYYSamHYKEMdvjYOYhsUNMLzgXyM",
  authDomain: "fir-learning-ebfe7.firebaseapp.com",
  projectId: "fir-learning-ebfe7",
  storageBucket: "fir-learning-ebfe7.appspot.com",
  messagingSenderId: "304484527915",
  appId: "1:304484527915:web:b37c33700f04689e0c5f6e",
  measurementId: "G-DZWV1TNWGX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);