import './style.css';

const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const taskCount = document.querySelector('#task-count');
const emptyMessage = document.querySelector('#empty-message');
const themeToggle = document.querySelector('#theme-toggle');

let tasks = [];

function updateTaskCount() {
  const total = tasks.length;

  taskCount.textContent =
    total === 0
      ? '0 tarefas'
      : total === 1
        ? '1 tarefa'
        : `${total} tarefas`;
}

function updateEmptyMessage() {
  emptyMessage.hidden = tasks.length > 0;
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.className = 'task-item';

    if (task.completed) {
      listItem.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.id = `task-${task.id}`;
    checkbox.setAttribute(
      'aria-label',
      `Concluir tarefa: ${task.text}`
    );

    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      renderTasks();
    });

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Excluir';
    deleteButton.setAttribute(
      'aria-label',
      `Excluir tarefa: ${task.text}`
    );

    deleteButton.addEventListener('click', () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      renderTasks();
    });

    listItem.append(checkbox, label, deleteButton);
    taskList.appendChild(listItem);
  });

  updateTaskCount();
  updateEmptyMessage();
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const text = taskInput.value.trim();

  if (!text) {
    return;
  }

  const newTask = {
    id: Date.now(),
    text,
    completed: false,
  };

  tasks.push(newTask);

  taskInput.value = '';
  taskInput.focus();

  renderTasks();
});

themeToggle.addEventListener('click', () => {
  const isDarkMode = document.body.classList.toggle('dark-mode');

  themeToggle.setAttribute(
    'aria-label',
    isDarkMode
      ? 'Desativar modo escuro'
      : 'Ativar modo escuro'
  );

  themeToggle.querySelector('span').textContent = isDarkMode
    ? 'Modo claro'
    : 'Modo escuro';

  themeToggle.firstChild.textContent = isDarkMode ? '☀️ ' : '🌙 ';
});

renderTasks();