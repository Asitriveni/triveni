let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.className = task.completed ? 'task completed' : 'task';

    taskDiv.innerHTML = `
      <div>
        <strong>${task.title}</strong><br>
        ${task.description}<br>
        <small>Due: ${task.dueDate}</small>
      </div>
      <div class="task-actions">
        <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    if (!task.completed && new Date(task.dueDate) <= new Date()) {
      taskDiv.style.background = '#ffcccc';
    }

    taskList.appendChild(taskDiv);
  });
}

function addTask() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('dueDate').value;

  if (!title || !dueDate) {
    alert('Title and due date are required.');
    return;
  }

  tasks.push({ title, description, dueDate, completed: false });
  saveTasks();
  renderTasks();

  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  document.getElementById('dueDate').value = '';
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

renderTasks();
