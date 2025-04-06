import { firebaseCollection } from "./firebase.js";
import { firebaseSubCollection } from "./firebase.js";
import { firebaseRegister } from "./firebase.js";
import { firebaseLogin } from "./firebase.js";
import { addTask } from "./firebase.js";
import { getTasks } from "./firebase.js";
import { deleteTask } from "./firebase.js";
import { changeStatus } from "./firebase.js";

try {
    console.log("soubor index.js načten");
} catch (e) {
    console.log(e);
}

// Getting the elements
window.task = 1;
window.isUserLoggedIn = false;
const taskCounter = document.getElementById("task");
const inputContainer = document.getElementById("inputContainer");
const grid = document.getElementById("taskShower")
console.log(grid)
if (localStorage.getItem("userName") !== "null"){
    window.name = localStorage.getItem("userName");
    isUserLoggedIn = true
} else {
    window.name = "placeholder"
}

console.log(`komponent úspěšně načten: ${taskCounter}, ${inputContainer}, ${userMenuPlaceholder},`);

// Function to show/hide components
function show(id) {
    let komponent = document.getElementById(id);
    console.log(`Toggling visibility for: ${id}`);
    console.log(`isUserLoggedIn: ${window.isUserLoggedIn}`);

    if (id === "userMenu") {
        if (komponent.style.display === "none" || komponent.style.display === "") {
            komponent.style.display = "flex";
        } else {
            komponent.style.display = "none";
        }

        let login = document.getElementById("loginRegister");
        let logged = document.getElementById("loggedMenu");

        if (window.isUserLoggedIn === false) {
            login.style.display = "flex";
            logged.style.display = "none";
        } else if (window.isUserLoggedIn === true) {
            login.style.display = "none";
            logged.style.display = "flex";
            document.getElementById("usernameInfo").innerText = window.name
        }
    } else if (komponent.style.display === "none" || komponent.style.display === "") {
        komponent.style.display = "flex";
    } else {
        komponent.style.display = "none";
    }

    console.log(`Component ${id} display: ${komponent.style.display}`);
}

// Function to add new input
function taskNumber(operator) {
    if (operator === "+") {
        window.task++;
    } else if (operator === "-" && window.task > 0) {
        window.task--;
    }
    taskCounter.innerText = window.task;

    // Uložit existující hodnoty
    let savedTasks = {};
    document.querySelectorAll(".addMenuSmallInput").forEach(input => {
        savedTasks[input.id] = input.value;
    });

    // Vyčistit kontejner
    inputContainer.innerHTML = "";

    // Vytvořit nové inputy se zachovanými hodnotami
    for (let i = 1; i <= window.task; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "addMenuSmallInput";
        input.placeholder = "task";
        input.id = `task-${i}`;

        // Obnovit hodnotu, pokud existovala
        if (savedTasks[input.id]) {
            input.value = savedTasks[input.id];
        }

        inputContainer.appendChild(input);
    }

    console.log(`Počet úkolů byl změněn: ${window.task}`);
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

function logOut() {
    window.isUserLoggedIn = false; 
    localStorage.setItem("userName", "null"); 
    console.log(window.isUserLoggedIn);
    document.getElementById("userLogInfo").innerText = "log out!";
    document.getElementById("loginState").innerText = " "
}

async function showTasks() {
    if (isUserLoggedIn) {
        let tasks = await getTasks();
        console.log(tasks);
        grid.innerHTML = "";

        tasks.forEach((element, index) => {
            // creating the task
            let task = document.createElement("div");
            task.className = "task";
            task.id = `${index}`;
            
            // task title
            let taskHeader = document.createElement("header");
            taskHeader.className = "taskHeader";
            taskHeader.id = `header-${index}`
            taskHeader.innerHTML = `
                ${element.title} 
                <button class="deleteButton" onclick="deleteTask('${task.id}')">delete</button>
            `;
            task.appendChild(taskHeader);

            // making the tasks
            element.tasks.forEach((singleTask, index) => {
                let taskPart = document.createElement("p");
                taskPart.className = "taskText";
                taskPart.id = `single-task${index}`;
            
                if (singleTask.status === "incopleted") {
                    taskPart.innerHTML = `${singleTask.task} <p>status: <button class="completionButton" onclick="changeStatus('${taskPart.id}', '${element.title}')">✖</button></p>`;

                    task.appendChild(taskPart);
                } else {
                }
            });

            // task end
            let taskFooter = document.createElement("footer");
            taskFooter.className = "taskFooter";
            taskFooter.innerText = element.date;
            task.appendChild(taskFooter);

            // putting it to the grid
            grid.appendChild(task);
        });
    } else {
        let task = document.createElement("div");
        task.innerText = "LOG IN FIRST!";
        grid.appendChild(task);
    }
}

window.getTasks = getTasks
window.show = show;
window.taskNumber = taskNumber
window.firebaseCollection = firebaseCollection
window.firebaseSubCollection = firebaseSubCollection
window.userMenuChange = userMenuChange
window.logOut = logOut
window.addTask = addTask
window.showTasks = showTasks
window.deleteTask = deleteTask
window.firebaseRegister = firebaseRegister
window.firebaseLogin = firebaseLogin
window.deleteTask = deleteTask
window.changeStatus = changeStatus

showTasks()