document.addEventListener("DOMContentLoaded", function() {
    // loadTasks();
    // Load tasks from the storage (DynamoDB)
    loadTasksFromStorage();
});
/*
function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    
    

    // Example tasks
    //const tasks = [
        //{ id: "ljahsdlajhds", nameTask: "Sample Task 1", descriptionTask: "Description for Sample Task 1", toogle: false },
        //{ id: "23fdsdfedwe3", nameTask: "Sample Task 2", descriptionTask: "Description for Sample Task 2", toogle: true },
        // Add more tasks as needed
    //];

    tasks.forEach(function(task, index) {
        addTaskToList(task, index);
    });
}
*/

function loadTasksFromStorage() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    // API call to retrieve tasks from DynamoDB
    fetch("https://jmayy9wgi3.execute-api.eu-west-1.amazonaws.com/dev", requestOptions)
        .then(response => {
            //let js = JSON.stringify(response);
            let arrayDePrueba = [{"idTask":"1701704021291","nameTask":"n","descriptionTask":"n","toggle":false}; {"idTask":"1701704021444","nameTask":"m","descriptionTask":"m","toggle":false}];
            let jsString = JSON.stringify(arrayDePrueba);
            alert (jsString);
            let jsObject = JSON.parse(jsString);
            let size = jsObject.length;
            alert (size);
            while (size > 0) {
                //addTaskToList(jsString[size-1]);
                addTaskToList(arrayDePrueba[size-1]);
                size = size-1;
            }
        })
        .catch(error => console.log('error', error));
}

function addTaskToList(task) {
    console.log('Adding task to list:', task);
    // Create the task list item
    const taskList = document.getElementById("taskList");
    
    const li = document.createElement("li");
    li.id = task.idTask; //Establecer el id del li como el idTask de la tarea
    li.innerHTML = `
        <strong class="${task.toggle ? 'toggle' : ''}">${task.nameTask}</strong>
        <p>${task.descriptionTask}</p>
        <button class="toggle-btn">Toggle</button>
        <button class="delete-btn">Delete</button>
    `;
    // Add the task to the DOM
    taskList.appendChild(li);
}


function addTask() {
    const taskNameInput = document.getElementById("taskNameInput");
    const taskDescriptionInput = document.getElementById("taskDescriptionInput");

    const taskID = Date.now().toString(); // Generate a unique ID (String type) for the task
    alert(taskID);
    const taskName = taskNameInput.value.trim();
    const taskDescription = taskDescriptionInput.value.trim();

    if (taskName !== "") {
        // Create a task object and add it to the tasks array
        const task = {idTask: taskID, nameTask: taskName, descriptionTask: taskDescription, toggle: false};
        addTaskToList(task);
        // Add the task to the storage (DynamoDB)
        saveTaskToStorage(task);
        // Clear the input fields
        taskNameInput.value = "";
        taskDescriptionInput.value = "";
    }
}

function addTaskToList(task) {
    console.log('Adding task to list:', task);
    // Create the task list item
    const taskList = document.getElementById("taskList");
    
    const li = document.createElement("li");
    
    if (task.idTask === undefined) {
        li.id = task.ID;
    } else {
        li.id = task.idTask; //Establecer el id del li como el idTask de la tarea
    }
    
    li.innerHTML = `
        <strong class="${task.toggle ? 'toggle' : ''}">${task.nameTask}</strong>
        <p>${task.descriptionTask}</p>
        <button class="toggle-btn">Toggle</button>
        <button class="delete-btn">Delete</button>
    `;
    // Add the task to the DOM
    taskList.appendChild(li);
}

function saveTaskToStorage(task) {
    // Save the task in DynamoDB calling the API
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
    // API call to save the task
    fetch("https://jmayy9wgi3.execute-api.eu-west-1.amazonaws.com/dev", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
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

    // Update the task's completion status in DynamoDB    
    taskId = taskItem.id; // Obtener el id del li= taskItem.id;
    alert(taskId);
    const task = {idTask: taskId, toggle: strongElement.classList.contains('toggle')};
    saveToggleToStorage(task);
}

function saveToggleToStorage(task) {
    // Change the toggle stake of the task in DynamoDB calling the API (if it is true, change it to false and vice versa)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(task);
    alert(raw);
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // API call to save the task
    fetch("https://jmayy9wgi3.execute-api.eu-west-1.amazonaws.com/dev", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function deleteTask(button) {
    const taskList = document.getElementById("taskList");
    const li = button.parentElement;
    const taskId = li.id;
    alert(taskId);
    const task = {idTask: taskId};
    // Delete the task from the storage (DynamoDB)
    deleteTaskFromStorage(task);
    // Remove the task from the DOM
    taskList.removeChild(li);
}

function deleteTaskFromStorage(taskId) {
    // Delete the task from DynamoDB calling the API
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(taskId);
    alert(raw);
    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // API call to delete the task
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
