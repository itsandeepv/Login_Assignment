import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDH5oxHK0dRelTXhFVrh2FQiW4oM7wp4Ho",
  authDomain: "favoriteproduct-f73fd.firebaseapp.com",
  projectId: "favoriteproduct-f73fd",
  storageBucket: "favoriteproduct-f73fd.appspot.com",
  messagingSenderId: "214709335830",
  appId: "1:214709335830:web:ec5c147a5de48ef6eb4237",
  measurementId: "G-6CWCF7L3RC"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()