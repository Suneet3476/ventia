const express = require('express');
const path = require('path');
const axios = require('axios');  // You can remove axios now, as Python will handle API calls

const app = express();
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API route to forward chatbot messages to Python server
app.post('/message', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: "No message provided." });
    }

    try {
        // Send the user's message to your Python server
        const response = await axios.post('http://localhost:5000/api/message', { message: userMessage });

        res.json({ reply: response.data.reply });
    } catch (error) {
        console.error('Error forwarding message to Python server:', error.message);
        res.status(500).json({ error: 'Error forwarding message to Python server.' });
    }
});

// Route for chatbot.html
app.get('/chatbot', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chatbot.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Node.js server running on port ${port}`);
});
