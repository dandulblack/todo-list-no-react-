//getting the elements
let task = 1
const taskCounter = document.getElementById("task")
const inputContainer = document.getElementById("inputContainer");
console.log(`komponent úspěšně načten: ${taskCounter}, ${inputContainer}`)

// function to show/hide components
function show(id) {
    let komponent = document.getElementById(id)
    if (komponent.style.display === "none" || komponent.style.display === "") {
        komponent.style.display = "flex"
    } else {
        komponent.style.display = "none"
    }
    console.log(`Komponent ${id} má display: ${komponent.style.display}`)
}

// function to add new input
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