// Get DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Function to fetch and display all to-dos from the server
const fetchTodos = async () => {
  try {
    const response = await fetch('/api/todos');
    if (!response.ok) {
      throw new Error('Failed to fetch to-dos');
    }
    const todos = await response.json();
    renderTodos(todos);
  } catch (error) {
    console.error('Error fetching to-dos:', error);
  }
};

// Function to render the to-do list on the page
const renderTodos = (todos) => {
  todoList.innerHTML = ''; // Clear the list first
  if (todos.length === 0) {
    // Use the class for the new empty message style
    todoList.innerHTML = '<p class="empty-list-message">No tasks yet. Add one!</p>';
    return;
  }
  todos.forEach(todo => {
    // Create the main container for a single to-do item
    const todoItem = document.createElement('div');
    // Apply custom CSS classes instead of Tailwind classes
    todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    
    // Create the text content element
    const taskText = document.createElement('span');
    taskText.textContent = todo.task;
    
    // Create a container for action buttons (delete and toggle complete)
    const actions = document.createElement('div');
    // Apply custom CSS classes
    actions.className = 'actions';

    // Toggle button (complete/incomplete)
    const toggleBtn = document.createElement('button');
    // Apply custom CSS classes
    toggleBtn.className = 'toggle-btn';
    toggleBtn.textContent = '✓';
    // Event listeners are here to enable interactivity
    toggleBtn.addEventListener('click', () => toggleTodo(todo.id, !todo.completed));

    // Delete button
    const deleteBtn = document.createElement('button');
    // Apply custom CSS classes
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '✗';
    // Event listeners are here to enable interactivity
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
    
    // Append all elements
    actions.appendChild(toggleBtn);
    actions.appendChild(deleteBtn);
    todoItem.appendChild(taskText);
    todoItem.appendChild(actions);
    todoList.appendChild(todoItem);
  });
};

// Function to add a new to-do item
const addTodo = async (task) => {
  try {
    // This fetch call requires the server to be running.
    await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task }),
    });
    todoInput.value = ''; // Clear the input field
    fetchTodos(); // Refresh the list
  } catch (error) {
    console.error('Error adding to-do:', error);
  }
};

// Function to toggle the completion status of a to-do
const toggleTodo = async (id, completed) => {
  try {
    // This fetch call requires the server to be running.
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    });
    fetchTodos(); // Refresh the list
  } catch (error) {
    console.error('Error toggling to-do:', error);
  }
};

// Function to delete a to-do item
const deleteTodo = async (id) => {
  try {
    // This fetch call requires the server to be running.
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    fetchTodos(); // Refresh the list
  } catch (error) {
    console.error('Error deleting to-do:', error);
  }
};

// Add event listener for the form submission
todoForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the page from reloading
  const task = todoInput.value.trim();
  if (task) {
    addTodo(task);
  }
});

// Initial fetch to load all existing to-dos when the page loads
fetchTodos();
