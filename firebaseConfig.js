// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-J_OJ7O2vMecMcknLffrfhQiETQqU8pk",
  authDomain: "whatsapp-2-clone-2c66e.firebaseapp.com",
  projectId: "whatsapp-2-clone-2c66e",
  storageBucket: "whatsapp-2-clone-2c66e.appspot.com",
  messagingSenderId: "1002365830727",
  appId: "1:1002365830727:web:2450df84e7d91528cc9362",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
export { db, auth, provider };
