console.log("soubor firebase.js načten");
// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Konfigurace Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCme57MnVJhMFXEecMF2auZotEIZXwazMw",
    authDomain: "todo-list-8e82f.firebaseapp.com",
    projectId: "todo-list-8e82f",
    storageBucket: "todo-list-8e82f.firebasestorage.app",
    messagingSenderId: "1069537627232",
    appId: "1:1069537627232:web:ae8182ddee99a7904a4705"
};

// Inicializace Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);