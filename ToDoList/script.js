document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");

    li.innerHTML = `
        <span onclick="toggleTask(this)">${taskText}</span>
        <button class="delete-btn" onclick="removeTask(this)">❌</button>
    `;

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}
//remove task function
function removeTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function toggleTask(task) {
    task.classList.toggle("completed");
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").innerText,
            completed: li.querySelector("span").classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span onclick="toggleTask(this)" class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="delete-btn" onclick="removeTask(this)">❌</button>
        `;
        document.getElementById("taskList").appendChild(li);
    });
}
