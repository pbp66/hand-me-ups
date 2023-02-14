// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDBkPeWHVmzBoOuIEt3koktDD8m1-nwI0Q",
  authDomain: "hand-me-ups.firebaseapp.com",
  projectId: "hand-me-ups",
  storageBucket: "hand-me-ups.appspot.com",
  messagingSenderId: "505496154194",
  appId: "1:505496154194:web:70774aaee0a7ce33eeef8b",
  measurementId: "G-5ZYF1N4KL1"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

