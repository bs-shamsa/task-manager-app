let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");

    if (input.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: input.value,
        completed: false
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);

    const updatedText = prompt("Edit Task", task.text);

    if (updatedText !== null && updatedText.trim() !== "") {
        task.text = updatedText;
        saveTasks();
        renderTasks();
    }
}

function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;

    saveTasks();
    renderTasks();
}

function renderTasks() {
    const pendingList = document.getElementById("pendingTasks");
    const completedList = document.getElementById("completedTasks");

    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>

            <button onclick="toggleTask(${task.id})">
                ${task.completed ? "Undo" : "Complete"}
            </button>

            <button onclick="editTask(${task.id})">
                Edit
            </button>

            <button onclick="deleteTask(${task.id})">
                Delete
            </button>
        `;

        if (task.completed) {
            completedList.appendChild(li);
        } else {
            pendingList.appendChild(li);
        }
    });
}

renderTasks();