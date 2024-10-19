const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


// Connect to MongoDB
mongoose.connect('mongodb+srv://49185:49185@cluster0.io3ti.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
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
