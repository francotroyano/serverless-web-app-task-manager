document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    // Example tasks
    const tasks = [
        //{ id: "ljahsdlajhds", nameTask: "Sample Task 1", descriptionTask: "Description for Sample Task 1", toogle: false },
        //{ id: "23fdsdfedwe3", nameTask: "Sample Task 2", descriptionTask: "Description for Sample Task 2", toogle: true },
        // Add more tasks as needed
    ];

    tasks.forEach(function(task, index) {
        addTaskToList(task, index);
    });
}

function addTask() {
    const taskNameInput = document.getElementById("taskNameInput");
    const taskDescriptionInput = document.getElementById("taskDescriptionInput");

    const taskID = Date.now(); // Generate a unique ID for the task
    alert(taskID);
    const taskName = taskNameInput.value.trim();
    const taskDescription = taskDescriptionInput.value.trim();

    if (taskName !== "") {
        // Create a task object and add it to the tasks array
        const task = { idTask: taskID, nameTask: taskName, descriptionTask: taskDescription, toggle: false};
        addTaskToList(task);
        saveTask(task);
        taskNameInput.value = "";
        taskDescriptionInput.value = "";
    }
}

function addTaskToList(task, index) {
    // Create the task list item
    const taskList = document.getElementById("taskList");
    
    const li = document.createElement("li");
        li.innerHTML = `
        <strong class="${task.toggle ? 'toggle' : ''}">${task.nameTask}</strong>
        <p>${task.descriptionTask}</p>
        <button class="toggle-btn">Toggle</button>
        <button class="delete-btn">Delete</button>
    `;
    // Add the task to the DOM
    taskList.appendChild(li);
}

function toggleTask(index) {
    const taskList = document.getElementById("taskList");
    const taskItem = taskList.childNodes[index];

    // Toggle the completed status
    const strongElement = taskItem.querySelector('strong');
    strongElement.classList.toggle('toggle');

    // Cross out the task if it is completed and vice versa
    if (strongElement.style.textDecoration === 'line-through') {
        strongElement.style.textDecoration = 'none';
    } else {
        strongElement.style.textDecoration = 'line-through';
    }

    // Implement code to update the task's completion status in storage (e.g., localStorage) here
}



function deleteTask(button) {
    const taskList = document.getElementById("taskList");
    const li = button.parentElement;
    const idTask = li.id.toString(); // Convert idTask to a string

    // Delete the task from DynamoDB calling the API
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "idTask": idTask });
    alert(raw);

    // Remove the task from the DOM
    taskList.removeChild(li);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("https://jmayy9wgi3.execute-api.eu-west-1.amazonaws.com/dev", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function saveTask(task) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(task);
    alert(raw);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
fetch("https://jmayy9wgi3.execute-api.eu-west-1.amazonaws.com/dev", requestOptions)
.then(response => response.json())
.then(result => console.log(result))
.catch(error => console.log('error', error));
}



// Delegating events for the Toggle and Delete buttons
document.getElementById("taskList").addEventListener("click", function(event) {
    const target = event.target;

    if (target.classList.contains("toggle-btn")) {
        const li = target.parentElement;
        const index = Array.from(li.parentElement.children).indexOf(li);
        toggleTask(index);
    } else if (target.classList.contains("delete-btn")) {
        deleteTask(target);
    }
});
