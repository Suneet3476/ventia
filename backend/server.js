const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../public'))); // Serve static files

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html')); // Serve the homepage
});

// Other routes can be defined here
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
