/**
 * server.js
 * 
 * Run:
 *    npm install express cors
 *    node server.js
 *
 * This starts a server on port 3000.
 */

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS (so the frontend can request from a different origin)
app.use(cors());
// Enable JSON-parsing middleware
app.use(express.json());

// In-memory array to store speed entries
// Format: [{ value: string, unit: string }]
let speeds = [];

/**
 * GET /speeds
 * Returns the entire list of speeds
 */
app.get('/speeds', (req, res) => {
  res.json(speeds);
});

/**
 * POST /speeds
 * Body: { value: string, unit: string }
 * Adds a new speed entry to the in-memory array
 */
app.post('/speeds', (req, res) => {
  const { value, unit } = req.body;

  // Simple validation
  if (!value || !unit) {
    return res.status(400).json({ error: 'Missing value or unit' });
  }

  // Store in array
  speeds.push({ value, unit });
  console.log(`New speed added: ${value} ${unit}`);

  // Return success message
  res.json({ message: 'Speed added successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
