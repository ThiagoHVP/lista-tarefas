import './style.css';

const STORAGE_KEY = 'lista-tarefas';
const THEME_KEY = 'lista-tarefas-theme';

const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const taskCount = document.querySelector('#task-count');
const emptyMessage = document.querySelector('#empty-message');
const themeToggle = document.querySelector('#theme-toggle');
const filterButtons = document.querySelectorAll('.filter-button');
const clearCompletedButton = document.querySelector('#clear-completed');

let tasks = loadTasks();
let currentFilter = 'all';

function loadTasks() {
try {
const savedTasks = localStorage.getItem(STORAGE_KEY);

```
if (!savedTasks) {
  return [];
}

const parsedTasks = JSON.parse(savedTasks);

if (!Array.isArray(parsedTasks)) {
  return [];
}

return parsedTasks.filter(
  (task) =>
    task &&
    typeof task.id === 'number' &&
    typeof task.text === 'string' &&
    typeof task.completed === 'boolean'
);
```

} catch {
return [];
}
}

function saveTasks() {
localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function getFilteredTasks() {
if (currentFilter === 'pending') {
return tasks.filter((task) => !task.completed);
}

if (currentFilter === 'completed') {
return tasks.filter((task) => task.completed);
}

return tasks;
}

function updateTaskCount() {
const total = tasks.length;
const completed = tasks.filter((task) => task.completed).length;
const pending = total - completed;

if (total === 0) {
taskCount.textContent = '0 tarefas';
return;
}

if (total === 1) {
taskCount.textContent = '1 tarefa · 1 pendente';
return;
}

const taskWord = `${total} tarefas`;
const pendingWord = pending === 1 ? '1 pendente' : `${pending} pendentes`;

taskCount.textContent = `${taskWord} · ${pendingWord}`;
}

function updateEmptyMessage(filteredTasks) {
if (filteredTasks.length > 0) {
emptyMessage.hidden = true;
return;
}

emptyMessage.hidden = false;

if (tasks.length === 0) {
emptyMessage.textContent = 'Nenhuma tarefa adicionada ainda.';
return;
}

if (currentFilter === 'pending') {
emptyMessage.textContent = 'Nenhuma tarefa pendente.';
return;
}

if (currentFilter === 'completed') {
emptyMessage.textContent = 'Nenhuma tarefa concluída.';
return;
}

emptyMessage.textContent = 'Nenhuma tarefa encontrada.';
}

function updateClearCompletedButton() {
const hasCompletedTasks = tasks.some((task) => task.completed);
clearCompletedButton.hidden = !hasCompletedTasks;
}

function updateFilterButtons() {
filterButtons.forEach((button) => {
const isActive = button.dataset.filter === currentFilter;

```
button.classList.toggle('active', isActive);
button.setAttribute('aria-pressed', String(isActive));
```

});
}

function createTaskElement(task) {
const listItem = document.createElement('li');
listItem.className = 'task-item';

if (task.completed) {
listItem.classList.add('completed');
}

const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.checked = task.completed;
checkbox.id = `task-${task.id}`;

const label = document.createElement('label');
label.htmlFor = checkbox.id;
label.textContent = task.text;

checkbox.setAttribute(
'aria-label',
`${task.completed ? 'Desmarcar' : 'Concluir'} tarefa: ${task.text}`
);

checkbox.addEventListener('change', () => {
task.completed = checkbox.checked;

```
saveTasks();
renderTasks();
```

});

const editButton = document.createElement('button');
editButton.type = 'button';
editButton.className = 'edit-button';
editButton.textContent = 'Editar';
editButton.setAttribute(
'aria-label',
`Editar tarefa: ${task.text}`
);

editButton.addEventListener('click', () => {
editTask(task);
});

const deleteButton = document.createElement('button');
deleteButton.type = 'button';
deleteButton.className = 'delete-button';
deleteButton.textContent = 'Excluir';
deleteButton.setAttribute(
'aria-label',
`Excluir tarefa: ${task.text}`
);

deleteButton.addEventListener('click', () => {
deleteTask(task.id);
});

const actions = document.createElement('div');
actions.className = 'task-item-actions';

actions.append(editButton, deleteButton);
listItem.append(checkbox, label, actions);

return listItem;
}

function renderTasks() {
const filteredTasks = getFilteredTasks();

taskList.replaceChildren();

filteredTasks.forEach((task) => {
taskList.appendChild(createTaskElement(task));
});

updateTaskCount();
updateEmptyMessage(filteredTasks);
updateClearCompletedButton();
updateFilterButtons();
}

function editTask(task) {
const newText = window.prompt('Edite sua tarefa:', task.text);

if (newText === null) {
return;
}

const text = newText.trim();

if (!text) {
return;
}

task.text = text;

saveTasks();
renderTasks();
}

function deleteTask(taskId) {
const task = tasks.find((item) => item.id === taskId);

if (!task) {
return;
}

const shouldDelete = window.confirm(
`Excluir a tarefa "${task.text}"?`
);

if (!shouldDelete) {
return;
}

tasks = tasks.filter((item) => item.id !== taskId);

saveTasks();
renderTasks();
}

taskForm.addEventListener('submit', (event) => {
event.preventDefault();

const text = taskInput.value.trim();

if (!text) {
taskInput.focus();
return;
}

const newTask = {
id: Date.now(),
text,
completed: false,
};

tasks.push(newTask);

saveTasks();

taskInput.value = '';
taskInput.focus();

renderTasks();
});

filterButtons.forEach((button) => {
button.addEventListener('click', () => {
currentFilter = button.dataset.filter;
renderTasks();
});
});

clearCompletedButton.addEventListener('click', () => {
const completedTasks = tasks.filter((task) => task.completed);

if (completedTasks.length === 0) {
return;
}

const shouldDelete = window.confirm(
`Excluir ${completedTasks.length === 1 ? 'a tarefa concluída' : `as ${completedTasks.length} tarefas concluídas`}?`
);

if (!shouldDelete) {
return;
}

tasks = tasks.filter((task) => !task.completed);

saveTasks();
renderTasks();
});

function getInitialTheme() {
const savedTheme = localStorage.getItem(THEME_KEY);

if (savedTheme === 'dark' || savedTheme === 'light') {
return savedTheme;
}

return window.matchMedia('(prefers-color-scheme: dark)').matches
? 'dark'
: 'light';
}

function applyTheme(theme) {
const isDarkMode = theme === 'dark';

document.body.classList.toggle('dark-mode', isDarkMode);

themeToggle.setAttribute(
'aria-label',
isDarkMode
? 'Ativar modo claro'
: 'Ativar modo escuro'
);

themeToggle.setAttribute(
'aria-pressed',
String(isDarkMode)
);

themeToggle.querySelector('[aria-hidden="true"]').textContent =
isDarkMode ? '☀️' : '🌙';

themeToggle.querySelector('span:last-child').textContent =
isDarkMode ? 'Modo claro' : 'Modo escuro';
}

themeToggle.addEventListener('click', () => {
const isDarkMode = document.body.classList.contains('dark-mode');
const newTheme = isDarkMode ? 'light' : 'dark';

localStorage.setItem(THEME_KEY, newTheme);
applyTheme(newTheme);
});

applyTheme(getInitialTheme());
renderTasks();