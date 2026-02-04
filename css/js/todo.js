let todos = [];
let currentFilter = 'all';

function addTodo() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();
  
  if (text) {
    const todo = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date().toLocaleDateString()
    };
    
    todos.push(todo);
    input.value = '';
    renderTodos();
    updateStats();
    saveTodos();
  }
}

function toggleTodo(id) {
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
  updateStats();
  saveTodos();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
  updateStats();
  saveTodos();
}

function filterTodos(filter) {
  currentFilter = filter;
  renderTodos();
  
  // Update active filter button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
}

function renderTodos() {
  const todoList = document.getElementById('todoList');
  let filteredTodos = todos;
  
  if (currentFilter === 'active') {
    filteredTodos = todos.filter(todo => !todo.completed);
  } else if (currentFilter === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed);
  }
  
  todoList.innerHTML = filteredTodos.map(todo => `
    <div class="card mb-2 todo-item ${todo.completed ? 'completed' : ''}">
      <div class="card-body d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <input type="checkbox" class="form-check-input me-3" 
                 ${todo.completed ? 'checked' : ''} 
                 onchange="toggleTodo(${todo.id})">
          <div>
            <span class="fw-bold">${todo.text}</span>
            <small class="text-muted d-block">Created: ${todo.createdAt}</small>
          </div>
        </div>
        <button class="btn btn-outline-danger btn-sm" onclick="deleteTodo(${todo.id})">
          Delete
        </button>
      </div>
    </div>
  `).join('');
}

function updateStats() {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const active = total - completed;
  
  document.getElementById('totalTasks').textContent = total;
  document.getElementById('activeTasks').textContent = active;
  document.getElementById('completedTasks').textContent = completed;
}

function clearAllTodos() {
  if (confirm('Are you sure you want to clear all tasks?')) {
    todos = [];
    renderTodos();
    updateStats();
    saveTodos();
  }
}

function handleEnter(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
    renderTodos();
    updateStats();
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadTodos();
  updateStats();
});