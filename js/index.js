// Define UI Variables

const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const taskInput = document.getElementById('task');

// Load all event listeners

loadEventListeners = () => {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', deleteTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
}

// Get tasks from localStorage
getTasks = (tasks) => {
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
    // Create li element
    const li = document.createElement('li');
    li.className = 'collection-item';

    // Create text node and append to the li
    li.appendChild(document.createTextNode(task));

    // Create a new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    // Add icon html
    link.innerHTML = '<i class="fas fa-times"></i>';

    // Append the link to li
    li.appendChild(link);

    // Append li to the ul
    taskList.appendChild(li);
  });
}

addTask = (e) => {
  if(taskInput.value === '') {
    alert('Add a task');
  } else {
    // Create li element
    const li = document.createElement('li');
    li.className = 'collection-item';

    // Create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create a new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    // Add icon html
    link.innerHTML = '<i class="fas fa-times"></i>';

    // Append the link to li
    li.appendChild(link);

    // Append li to the ul
    taskList.appendChild(li);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';
  }

  e.preventDefault();
};

storeTaskInLocalStorage = (task) => {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

deleteTask = (e) => {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from localStorage

      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

removeTaskFromLocalStorage = (taskItem) => {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

clearTasks = (e) => {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  removeAllTasksFromLocalStorage();
}

removeAllTasksFromLocalStorage = (e) => {
  let tasks = [];
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

filterTasks = (e) => {
  const text = e.target.value.toLowerCase();
  // Returns a NodeList
  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

loadEventListeners();
