document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements Selection ---
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const errorMsg = document.getElementById('error-msg');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // --- App State ---
    // Load tasks from localStorage or initialize with an empty array if none exist
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all'; // Default filter state

    // Initial render on page load
    renderTasks();

    // --- Event Listeners ---

    // Add task on button click
    addBtn.addEventListener('click', addTask);

    // Add task on "Enter" key press
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Handle filter button clicks
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove 'active' class from previously selected button
            document.querySelector('.filter-btn.active').classList.remove('active');
            // Add 'active' class to clicked button
            btn.classList.add('active');
            
            // Update state and re-render the list
            currentFilter = btn.getAttribute('data-filter');
            renderTasks();
        });
    });

    // --- Core Functions ---

    /**
     * Adds a new task to the state and saves it.
     */
    function addTask() {
        const taskText = todoInput.value.trim();

        // Validation: Prevent empty tasks
        if (taskText === "") {
            errorMsg.textContent = "Please enter a task.";
            return;
        }

        errorMsg.textContent = ""; // Clear error message
        
        const newTask = {
            id: Date.now(), // Use timestamp as a unique ID
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        saveAndRender();
        
        // Reset input field and refocus
        todoInput.value = "";
        todoInput.focus();
    }

    /**
     * Toggles the completion status of a task.
     * @param {number} id - The ID of the task to toggle.
     */
    function toggleTask(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        saveAndRender();
    }

    /**
     * Deletes a task from the array based on its ID.
     * @param {number} id - The ID of the task to delete.
     */
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveAndRender();
    }

    /**
     * Saves the current state to LocalStorage and triggers a UI update.
     */
    function saveAndRender() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    /**
     * Renders the task list based on the current state and filter.
     * Clears the list and rebuilds it from the 'tasks' array.
     */
    function renderTasks() {
        todoList.innerHTML = ""; // Clear current list

        // Filter tasks based on the selected category (All, Active, Completed)
        const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'active') return !task.completed;
            if (currentFilter === 'completed') return task.completed;
            return true;
        });

        // Generate HTML for each task
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `todo-item ${task.completed ? 'completed' : ''}`;

            // Checkbox for completion
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.setAttribute('aria-label', `Mark ${task.text} as completed`);
            checkbox.addEventListener('change', () => toggleTask(task.id));

            // Task text
            const span = document.createElement('span');
            span.textContent = task.text;
            // Allow clicking the text to toggle completion as well
            span.addEventListener('click', () => toggleTask(task.id)); 

            // Delete button
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.className = 'delete-btn';
            delBtn.setAttribute('aria-label', `Delete task: ${task.text}`);
            delBtn.addEventListener('click', () => deleteTask(task.id));

            // Assemble the list item
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(delBtn);
            todoList.appendChild(li);
        });
    }
});