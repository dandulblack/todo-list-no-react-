import { firebaseCollection } from "./firebase.js";
import { firebaseSubCollection } from "./firebase.js";
import { firebaseRegister } from "./firebase.js";
import { firebaseLogin } from "./firebase.js";

try {
    console.log("soubor index.js načten");
} catch (e) {
    console.log(e);
}

// Getting the elements
let task = 1;
window.isUserLoggedIn = false;
const taskCounter = document.getElementById("task");
const inputContainer = document.getElementById("inputContainer");
console.log(`komponent úspěšně načten: ${taskCounter}, ${inputContainer}, ${userMenuPlaceholder},`);

// Function to show/hide components
function show(id) {
    let komponent = document.getElementById(id);
    if (komponent.style.display === "none" || komponent.style.display === "") {
        komponent.style.display = "flex";
    } else {
        komponent.style.display = "none";
    }
    console.log(`Komponent ${id} má display: ${komponent.style.display}`);
}

// Function to add new input
function taskNumber(operator) {
    if (operator === "+") {
        task++;
    } else if (operator === "-" && task > 0) {
        task--;
    }
    taskCounter.innerText = task;

    // Clear existing inputs before adding new ones
    inputContainer.innerHTML = "";

    // Create new input elements based on the value of task
    for (let i = 0; i < task; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "addMenuSmallInput";
        input.placeholder = "task";
        inputContainer.appendChild(input); // Add each input to the container
    }

    console.log(`Počet úkolů byl změněn: ${task}`);
}

function userMenuChange() {
    const userMenuPlaceholder = document.getElementById("userMenuPlaceholder");
    const loginButton = document.getElementById("loginButtonId");
    const loginNotice = document.getElementById("loginNotice");

    if (userMenuPlaceholder.style.transform === "translateX(-100%)") {
        userMenuPlaceholder.style.transform = "translateX(0%)";
        userMenuPlaceholder.style.borderRadius = "0px 27px 27px 0px";
        loginButton.textContent = "sign up";
        loginNotice.innerHTML = "<p id='loginNotice'>No account ? <br> sign up instead</p>";
    } else {
        userMenuPlaceholder.style.transform = "translateX(-100%)"; 
        userMenuPlaceholder.style.borderRadius = "27px 0px 0px 27px";  
        loginButton.textContent = "login";
        loginNotice.innerHTML = "<p id='loginNotice'>Already have an account ? <br> login instead</p>";
    }
}


window.show = show;
window.taskNumber = taskNumber
window.firebaseCollection = firebaseCollection
window.firebaseSubCollection = firebaseSubCollection
window.userMenuChange = userMenuChange
window.firebaseRegister = firebaseRegister
window.firebaseLogin = firebaseLogin