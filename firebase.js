console.log("soubor firebase.js načten");
// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { doc, setDoc, getDoc, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
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
    } else if (password === passwordCheck && name !== "" && password !== "") {
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
  window.name = document.getElementById("username").value;
  window.password = document.getElementById("password").value;
  let loginState = document.getElementById("loginState");
  const docRef = doc(getFirestore(), "users", window.name);
  const docSnap = await getDoc(docRef);
  const checkbox = document.getElementById("keepLoggedIn")
  if (!docSnap.exists()) {
      loginState.style.color = "red";
      loginState.innerText = "User name does not exist!";
      console.log(`User is logged in: ${window.isUserLoggedIn}`);
  } else {
      let data = docSnap.data();
      if (data.password === window.password) {
          loginState.style.color = "green";
          loginState.innerText = "Logged in successfully";
          window.isUserLoggedIn = true; // Update global variable
          console.log(`User is logged in: ${window.isUserLoggedIn}`);
          document.getElementById("loginNotice").innerText = " "
          if (checkbox.checked){
            localStorage.setItem("userInfo", JSON.stringify(window.isUserLoggedIn));
            localStorage.setItem("userName", window.name)
          }
      } else {
          loginState.style.color = "red";
          loginState.innerText = "Incorrect password!";
      }
  }
}

export async function addTask() {
  if (!window.name) {
    console.error("User name is undefined or empty.");
    return;
  }

  let documentRef = doc(db, "users", window.name);
  let subcollectionRef = collection(documentRef, "tasks");

  let title = document.getElementById("title").value;
  let date = document.getElementById("date").value;

  let tasks = [];
  for (let i = 1; i < window.task + 1; i++) {
    let taskValue = document.getElementById(`task-${i}`).value;
    let task = {task: taskValue, status: "incopleted"}
    tasks.push(task);
    console.log(`task-${i}:`, taskValue);
  }

  let data = {
    title: title,
    date: date,
    tasks: tasks
  };

  console.log(data);

  try {
    // Používáme setDoc místo addDoc a nastavujeme title jako ID dokumentu
    const docRef = doc(subcollectionRef, title); // Nastavíme title jako ID dokumentu
    await setDoc(docRef, data); // Vytvoří dokument s ID title a uloží data
    console.log("Dokument byl úspěšně přidán s ID:", title);
  } catch (e) {
    console.error("Chyba při přidávání dokumentu: ", e);
  }
}

export async function getTasks() {
  const tasksRef = collection(db, "users", window.name, "tasks"); 
  const documents = await getDocs(tasksRef);
  let tasks = []
  documents.forEach(function (doc) {
    tasks.push({ id: doc.id, ...doc.data() });
  });
  console.log(tasks)
  return tasks
}

export async function deleteTask(id) {
  console.log(id);
  console.log("Window Name:", JSON.stringify(window.name));
  let docId = (document.getElementById(`header-${id}`).innerText.replace("delete", "")).trim();
  let ref = doc(db, "users", window.name, "tasks", docId);
  let snapshot = await getDoc(ref);
  if (snapshot.exists()){
  try {  
    await deleteDoc(doc(db, "users", window.name, "tasks", docId));  
    console.log("Dokument úspěšně smazán" + docId);  
    showTasks()
  } catch (error) {  
    console.error("Chyba při mazání dokumentu:", error);  
  } 
  } else {
    console.log("dokument neexistuje")
  } 
}

export async function changeStatus(task, doc) {
  console.log(task + "  " +  doc)
}