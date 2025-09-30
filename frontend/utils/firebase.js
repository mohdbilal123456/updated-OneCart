// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "ecommercelogin-705be.firebaseapp.com",
  projectId: "ecommercelogin-705be",
  storageBucket: "ecommercelogin-705be.firebasestorage.app",
  messagingSenderId: "849847282206",
  appId: "1:849847282206:web:4d3049ede7f2436bf81c0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider}