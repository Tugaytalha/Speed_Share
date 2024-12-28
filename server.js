/**
 * server.js
 *
 * Commands to run (if local testing):
 *    npm install express cors
 *    node server.js
 *
 * On Railway, you just push this repo and configure your service to run `node server.js`.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// On Railway, the port is provided in process.env.PORT
// Fallback to 3000 if not set
const PORT = process.env.PORT || 3000;

// Enable CORS (so that requests from other origins are allowed, if needed)
app.use(cors());

// Enable JSON body parsing for POST requests
app.use(express.json());

// Serve all static files in the `public` folder
// e.g., `index.html` will be served at the root `/`
app.use(express.static(path.join(__dirname, 'public')));

// In-memory array to store speeds
let speeds = [];

// GET /speeds -> returns all speed entries
app.get('/speeds', (req, res) => {
  res.json(speeds);
});

// POST /speeds -> add a new entry
app.post('/speeds', (req, res) => {
  const { value, unit } = req.body;

  if (!value || !unit) {
    return res.status(400).json({ error: 'Missing value or unit' });
  }

  speeds.push({ value, unit });
  console.log(`New speed added: ${value} ${unit}`);

  res.json({ message: 'Speed added successfully' });
});

// For any other routes not handled by the above, serve `index.html`
// This is helpful for single-page apps where the frontend handles the routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
