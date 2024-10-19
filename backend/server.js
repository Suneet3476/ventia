const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/ventia-db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

app.use(express.json()); // Parse JSON bodies

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, '../public')));

// Your backend routes will go here

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
