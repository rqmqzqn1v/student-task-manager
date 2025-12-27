const auth = document.getElementById('auth');
const app = document.getElementById('app');
const welcome = document.getElementById('welcome');
const tasksList = document.getElementById('tasks');

function login() {
  const name = document.getElementById('username').value;
  if (!name) return alert('Введите имя');
  localStorage.setItem('user', name);
  init();
}

function logout() {
  localStorage.removeItem('user');
  location.reload();
}

function addTask() {
  const title = document.getElementById('title').value;
  const desc = document.getElementById('desc').value;
  const priority = document.getElementById('priority').value;

  if (!title) return alert('Введите название');

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ title, desc, priority });
  localStorage.setItem('tasks', JSON.stringify(tasks));

  renderTasks();
}

function renderTasks() {
  tasksList.innerHTML = '';
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  if (tasks.length === 0) {
    tasksList.innerHTML = '<li>Задач нет</li>';
    return;
  }

  tasks.forEach(t => {
    const li = document.createElement('li');
    li.innerHTML = `<b>${t.title}</b><br>${t.desc}<br><small>${t.priority}</small>`;
    tasksList.appendChild(li);
  });
}

function init() {
  const user = localStorage.getItem('user');
  if (user) {
    auth.classList.add('hidden');
    app.classList.remove('hidden');
    welcome.textContent = 'Добро пожаловать, ' + user;
    renderTasks();
  }
}

init();
