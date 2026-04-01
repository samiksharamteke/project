let todos = [];

// Improved Object Constructor
function Todo(task) {
    this.id = Date.now(); // Unique ID for better tracking
    this.task = task;
    this.completed = false;
}

const form = document.getElementById('taskForm');
const input = document.getElementById('taskInput');
const list = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');

// 1. ADD TASK
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value.trim() === "") return;

    todos.push(new Todo(input.value));
    input.value = "";
    displayTasks();
});

// 2. DELETE TASK
function deleteTask(id) {
    todos = todos.filter(t => t.id !== id);
    displayTasks();
}

// 3. TOGGLE DONE
function toggleDone(id) {
    todos = todos.map(t => {
        if (t.id === id) t.completed = !t.completed;
        return t;
    });
    displayTasks();
}

// 4. SEARCH/FILTER LOGIC
searchInput.addEventListener('input', () => displayTasks());

// 5. DISPLAY TASKS
function displayTasks() {
    list.innerHTML = "";
    const searchTerm = searchInput.value.toLowerCase();

    // Filter based on search input
    const filteredTodos = todos.filter(t => 
        t.task.toLowerCase().includes(searchTerm)
    );

    filteredTodos.forEach((todo) => {
        const li = document.createElement("li");
        li.className = "task-item";
        
        li.innerHTML = `
            <span class="task-text ${todo.completed ? 'completed' : ''}">${todo.task}</span>
            <div class="actions">
                <button class="done-btn" onclick="toggleDone(${todo.id})">${todo.completed ? 'Undo' : 'Done'}</button>
                <button class="delete-btn" onclick="deleteTask(${todo.id})">Delete</button>
            </div>
        `;
        list.appendChild(li);
    });
}