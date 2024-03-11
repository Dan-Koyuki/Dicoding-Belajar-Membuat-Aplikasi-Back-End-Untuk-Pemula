const express = require('express');
const cors = require('cors');
const books = require('../routes/book.route');

const app = express();

// CORS Settings
app.use(cors());
app.use((req, res, next) => {
  // Allow requests from all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Define allowed methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // Define allowed headers
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // Continue to the next middleware
  next();
});
app.options('*', (req, res) => {
  // Respond to preflight requests
  res.status(200).end();
});

// Routes
app.use(express.json());
app.use('/books', books);

app.get('/', (req, res) => {
  res.status(200)
      .json('Welcome, this is Irwanto Danang Bahtiar\'s Bookshelf API.');
});

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
