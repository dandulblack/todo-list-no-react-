// Purpose: Firebase configuration
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCme57MnVJhMFXEecMF2auZotEIZXwazMw",
  authDomain: "todo-list-8e82f.firebaseapp.com",
  projectId: "todo-list-8e82f",
  storageBucket: "todo-list-8e82f.firebasestorage.app",
  messagingSenderId: "1069537627232",
  appId: "1:1069537627232:web:ae8182ddee99a7904a4705"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);