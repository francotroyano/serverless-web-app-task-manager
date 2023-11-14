document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    // Example tasks
    const tasks = [
        { name: "Sample Task 1", description: "Description for Sample Task 1", completed: false },
        { name: "Sample Task 2", description: "Description for Sample Task 2", completed: true },
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
        const task = { name: taskName, description: taskDescription, completed: false };
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
        <strong class="${task.completed ? 'completed' : ''}">${task.name}</strong>
        <p>${task.description}</p>
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
    strongElement.classList.toggle('completed');

    // Implement code to update the task's completion status in storage (e.g., localStorage) here
}

function deleteTask(button) {
    const taskList = document.getElementById("taskList");
    const li = button.parentElement;
    taskList.removeChild(li);
    // Implement code to delete the task from storage (e.g., localStorage) here
}

function saveTask(task) {
    // Save the task to localStorage or any other storage mechanism
    // You can use JSON.stringify() to convert the task object to a string
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
