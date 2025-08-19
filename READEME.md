Project: Full-Stack To-Do List✨

This project is the culmination of a personal 2-month full-stack development challenge. 
It serves as a practical example of building a complete web application from scratch, 
highlighting the core principles of front-end and back-end communication.

Project Breakdown
Front-End (/public folder):

Built with Vanilla HTML, CSS, and JavaScript. No frameworks were used to ensure a deep understanding of core web technologies.

The front-end handles all user interactions and sends requests to the back-end API.

Back-End (server.js):

Powered by Node.js and the Express.js framework.

Manages a simple in-memory "database" to store to-do items.

Handles REST API endpoints for all CRUD (Create, Read, Update, Delete) operations.

API Endpoints
HTTP Method	Endpoint	Description
GET	/api/todos	Retrieves all to-do items.
POST	/api/todos	Creates a new to-do item.
PUT	/api/todos/:id	Updates an existing to-do item.
DELETE	/api/todos/:id	Deletes a to-do item.

How to Run
Clone this repository.

Navigate to the project directory in your terminal.

Install dependencies: npm install express

Start the server: node server.js

Open your browser and navigate to http://localhost:3000.
