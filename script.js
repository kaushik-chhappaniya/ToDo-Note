document.getElementById('add-task-icon').addEventListener('click', addTask);
document.getElementById('new-task').addEventListener('keypress', (event) => event.key ==='Enter'? addTask() : '');    
document.getElementById('all').addEventListener('click', () => renderTasks('all'));
document.getElementById('completed').addEventListener('click', () => renderTasks('completed'));
document.getElementById('incomplete').addEventListener('click', () => renderTasks('incomplete'));
document.getElementById('clear-completed').addEventListener('click', clearCompletedTasks);
document.getElementById('complete-all').addEventListener('click', completeAllTasks);
let tasks = [];

// Add task
function addTask() {
    // alert('Task added');
    const taskInput = document.getElementById('new-task');
    console.log('taskInput :', taskInput);
    const taskText = taskInput.value.trim();
    console.log('taskText :', taskText);
    
    if (taskText) {
        const task = { text: taskText, completed: false };
        tasks.push(task);
        taskInput.value = '';
        renderTasks();
    }
}

// Render tasks according to the filter
function renderTasks(filter = 'all') {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') {
            return task.completed;
        } else if (filter === 'incomplete') {
            return !task.completed;
        } else {
            return true;
        }
    });

    console.log('filteredTasks :', filteredTasks);
    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        const checkSpan = document.createElement('span');
        
        const checkboxLabel = document.createElement('label');
        checkboxLabel.setAttribute('for', `checkbox-${index}`);
        checkboxLabel.innerHTML = '<i class="check-button fa fa-check"></i>';

        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `checkbox-${index}`;
        checkbox.style.opacity = 0;

        // checkSpan.appendChild(checkbox);
        checkboxLabel.appendChild(checkbox);
        checkSpan.appendChild(checkboxLabel);

        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompletion(index));
        console.log('index att toggle:', index);

        const taskText = document.createElement('span');
        taskText.textContent = task.text;

        const deleteButton = document.createElement('a');
        deleteButton.classList.add("delete-button","fa-solid","fa-trash");
        deleteButton.addEventListener('click', () => deleteTask(index));


        li.appendChild(checkSpan);
        li.appendChild(taskText);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
                    const taskLeft = filteredTasks.filter((task) => !task.completed).length ;
        document.querySelector('.task-left span').innerHTML = `<i class="fa-solid fa-briefcase"></i> Tasks Left:  <b> ${ taskLeft==0 ? 0 : taskLeft } </b>`; 
    });
}

// Mark task completed
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    console.log(' tasks[index] :', index, tasks[index]);
    renderTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Clear Complete tasks
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
}

// Complete all tasks
function completeAllTasks() {
    tasks.forEach(task => task.completed = true);
    renderTasks();
}


// Toggle Dark mode
function toggleSwitch() {
    const body = document.body;
    const toDoContainer = document.querySelector('#todo-container-box');

    body.classList.toggle('dark-theme'); // Add/remove dark-theme class
    toDoContainer.classList.toggle('todo-container-dark'); // Remove dark-theme class
    document.querySelector('li.completed').classList.toggle("li-completed-dark");
    const themeIcon = document.querySelector('label[for="theme-toggle"] i');
    if (body.classList.contains('dark-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun'); /* Change to sun icon for dark theme */
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}