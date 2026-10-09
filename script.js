
// ======================================
// DARK WILD - TO-DO TASK MANAGER
// ======================================

let tasks = [
    { id: 1, text: "Complete SQL assignment", completed: false },
    { id: 2, text: "Submit JavaScript project report", completed: false },
    { id: 3, text: "Attend Python class", completed: false },
    { id: 4, text: "Complete React exercise", completed: false }
];

let nextId = 5;
let currentFilter = "all";

// Get HTML elements
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

// ADD TASK
function addTask() {
    const text = taskInput.value.trim();

    if (!text) {
        alert("Please enter a task!");
        taskInput.focus();
        return;
    }

    tasks.push({
        id: nextId++,
        text: text,
        completed: false
    });

    taskInput.value = "";
    displayTasks();
    taskInput.focus();
}

// VIEW TASK
function viewTask(id) {
    const task = tasks.find(task => task.id === id);

    if (task) {
        alert(
            "TASK DETAILS\n\n" +
            "Description: " + task.text + "\n" +
            "Status: " + (task.completed ? "Completed" : "Pending")
        );
    }
}

// UPDATE TASK
function updateTask(id) {
    const task = tasks.find(task => task.id === id);

    if (!task) return;

    const updatedText = prompt("Enter the updated task:", task.text);

    if (updatedText === null) return;

    if (updatedText.trim() === "") {
        alert("Task cannot be empty!");
        return;
    }

    task.text = updatedText.trim();
    displayTasks();
}

// DELETE TASK
function deleteTask(id) {
    const confirmed = confirm("Are you sure you want to delete this task?");

    if (!confirmed) return;

    tasks = tasks.filter(task => task.id !== id);
    displayTasks();
}

// MARK TASK COMPLETED OR PENDING
function toggleTask(id) {
    const task = tasks.find(task => task.id === id);

    if (!task) return;

    task.completed = !task.completed;
    displayTasks();
}

// FILTER TASKS
function showTasks(filter) {
    currentFilter = filter;
    displayTasks();
}

// DISPLAY TASKS
function displayTasks() {
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === "pending") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    if (filteredTasks.length === 0) {
        const emptyItem = document.createElement("li");

        if (currentFilter === "pending") {
            emptyItem.textContent = "🎯 No pending tasks!";
        } else if (currentFilter === "completed") {
            emptyItem.textContent = "✨ No completed tasks yet!";
        } else {
            emptyItem.textContent = "🌿 No tasks. Add your first task!";
        }

        emptyItem.style.justifyContent = "center";
        emptyItem.style.color = "#00ff88";
        taskList.appendChild(emptyItem);
    }

    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", "Mark task completed");

        checkbox.addEventListener("change", () => {
            toggleTask(task.id);
        });

        // Task description
        const description = document.createElement("span");
        description.textContent = task.text;

        // View button
        const viewButton = document.createElement("button");
        viewButton.textContent = "VIEW";
        viewButton.style.borderColor = "#00d9ff";
        viewButton.style.color = "#00d9ff";

        viewButton.addEventListener("click", () => {
            viewTask(task.id);
        });

        // Edit button
        const editButton = document.createElement("button");
        editButton.textContent = "EDIT";
        editButton.style.borderColor = "#a855f7";
        editButton.style.color = "#c084fc";

        editButton.addEventListener("click", () => {
            updateTask(task.id);
        });

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "DELETE";

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        li.append(
            checkbox,
            description,
            viewButton,
            editButton,
            deleteButton
        );

        taskList.appendChild(li);
    });

    updateStatistics();
}

// UPDATE STATISTICS
function updateStatistics() {
    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    const pending = total - completed;

    totalTasks.textContent = total;
    pendingTasks.textContent = pending;
    completedTasks.textContent = completed;
}

// ADD TASK USING ENTER KEY
taskInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        addTask();
    }
});

// INITIALIZE TASK LIST
displayTasks();


