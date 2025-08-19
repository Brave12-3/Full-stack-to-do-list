// Import the necessary modules
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// To install dependencies, run these commands in your terminal:
// npm init -y
// npm install express

// Middleware to parse incoming JSON bodies from HTTP requests
app.use(express.json());

// Tell Express to serve the front-end files from a directory called 'public'
// The path.join() method ensures this works correctly on any operating system.
app.use(express.static(path.join(__dirname, 'public')));

// Simple in-memory "database" to store our to-do list items.
// In a real-world application, you would replace this with a persistent database like MongoDB or PostgreSQL.
let todos = [];
let nextId = 1;

// GET endpoint to retrieve all to-do items
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// POST endpoint to add a new to-do item
app.post('/api/todos', (req, res) => {
  // Ensure the request body contains a 'task' property
  if (!req.body.task) {
    return res.status(400).send('Task is required');
  }
  const newTodo = {
    id: nextId++,
    task: req.body.task,
    completed: false, // All new tasks are incomplete by default
  };
  todos.push(newTodo);
  // Send back the newly created to-do item with a 201 Created status
  res.status(201).json(newTodo);
});

// PUT endpoint to update an existing to-do item
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).send('To-do item not found.');
  }

  // Update the task and completed status if they are provided in the request body
  if (req.body.task !== undefined) {
    todo.task = req.body.task;
  }
  if (req.body.completed !== undefined) {
    todo.completed = req.body.completed;
  }

  res.json(todo);
});

// DELETE endpoint to remove a to-do item
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  // Filter out the item with the matching ID
  todos = todos.filter(t => t.id !== id);
  
  // Check if an item was actually removed
  if (todos.length < initialLength) {
    // Send a 204 No Content status on successful deletion
    res.status(204).send();
  } else {
    // If no item was found, send a 404 Not Found status
    res.status(404).send('To-do item not found.');
  }
});

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

