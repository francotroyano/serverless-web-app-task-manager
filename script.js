document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    // Example tasks
    const tasks = [
        { nameTask: "Sample Task 1", descriptionTask: "Description for Sample Task 1", toogle: false },
        { nameTask: "Sample Task 2", descriptionTask: "Description for Sample Task 2", toogle: true },
        // Add more tasks as needed
    ];

    tasks.forEach(function(task, index) {
        addTaskToList(task, index);
    });
}

function addTask() {
    const taskNameInput = document.getElementById("taskNameInput");
    const taskDescriptionInput = document.getElementById("taskDescriptionInput");

    const taskName = taskNameInput.value.trim();
    const taskDescription = taskDescriptionInput.value.trim();

    if (taskName !== "") {
        const task = { nameTask: taskName, descriptionTask: taskDescription, toggle: false };
        addTaskToList(task);
        saveTask(task);
        taskNameInput.value = "";
        taskDescriptionInput.value = "";
    }
}

function addTaskToList(task, index) {
    const taskList = document.getElementById("taskList");

    const li = document.createElement("li");
    li.innerHTML = `
        <strong class="${task.toogle ? 'toogle' : ''}">${task.nameTask}</strong>
        <p>${task.descriptionTask}</p>
        <button class="toggle-btn">Toggle</button>
        <button class="delete-btn">Delete</button>
    `;

    taskList.appendChild(li);
}

function toggleTask(index) {
    const taskList = document.getElementById("taskList");
    const taskItem = taskList.childNodes[index];

    // Toggle the completed status
    const strongElement = taskItem.querySelector('strong');
    strongElement.classList.toggle('toogle');

    // Implement code to update the task's completion status in storage (e.g., localStorage) here
}

function deleteTask(button) {
    const taskList = document.getElementById("taskList");
    const li = button.parentElement;
    taskList.removeChild(li);
    // Implement code to delete the task from storage (e.g., localStorage) here
}

function saveTask(task) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(task);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
fetch("https://jmayy9wgi3.execute-api.eu-west-1.amazonaws.com/dev", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
}



// Delegación de eventos para los botones Toggle y Delete
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
