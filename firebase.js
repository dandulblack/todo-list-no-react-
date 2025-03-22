console.log("soubor firebase.js načten");
// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { Timestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";




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

export async function firebaseCollection(collectionName, documentId, data) {
    try {
      await setDoc(doc(getFirestore(), collectionName, documentId), data);
      console.log("Dokument byl přidán!");
    } catch (e) {
      console.error("Chyba při přidávání dokumentu: ", e);
    }
}

export async function firebaseSubCollection(collectionName, documentId, subcollectionName, subdocumentId, data) {
    try {
        let documentRef = doc(db, collectionName, documentId);
        let subcollectionRef = collection(documentRef, subcollectionName);
        let subdocumentRef = doc(subcollectionRef, subdocumentId);

        await setDoc(subdocumentRef, data);
        console.log("Dokument v subkolekci byl přidán!");
    } catch (e) {
        console.error("Chyba při přidávání dokumentu do subkolekce: ", e);
    }
}

export async function firebaseRegister() {
  try {
    let name = document.getElementById("makeUsername").value;
    let password = document.getElementById("makePassword").value;
    let passwordCheck = document.getElementById("makePasswordConfirm").value;
    let notice = document.getElementById("registrationState");

    const docRef = doc(getFirestore(), "users", name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      notice.innerText = "Username already taken!";
      notice.style.color = "red";
    } else if (password !== passwordCheck) {
      notice.innerText = "Password does not match!";
      notice.style.color = "red";
    } else if (password === passwordCheck && name !== "" && password !== "" && !(docSnap.exists())) {
      await setDoc(doc(getFirestore(), "users", name), {
        name: name,
        password: password,
        registrationTime: Timestamp.now()
      });

      console.log("Uživatel byl úspěšně zaregistrován!");
      notice.innerText = "Registered correctly!";
      notice.style.color = "green";
    } else if (password === "" || name === "") {
      notice.innerText = "Fill all the forms!";
      notice.style.color = "red";
    }
  } catch (e) {
    console.log(`něco se posralo: ${e}`);
  }
}

export async function firebaseLogin() {
  let name = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let loginState = document.getElementById("loginState")
  const docRef = doc(getFirestore(), "users", name);
  const docSnap = await getDoc(docRef);

  if (!(docSnap.exists())){
    loginState.style.color = "red";
    loginState.innerText = "user name does not exist !"
    console.log(`uživatel je přihlášen: ${window.isUserLoggedIn}`)
  } else if (docSnap.exists()) {
    let data = docSnap.data();
    if (data.password === password){
      loginState.style.color = "green";
      loginState.innerText = "logged in succesfully"
      window.isUserLoggedIn = true
      console.log(`uživatel je přihlášen: ${window.isUserLoggedIn}`)
    } else if (data.password !== password){
      loginState.style.color = "red";
      loginState.innerText = "incorrect password !"
      console.log(`uživatel je přihlášen: ${window.isUserLoggedIn}`)
    }
  } 
}