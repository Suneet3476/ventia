const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();  // Ensure environment variables are loaded

const app = express();
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Access the Hugging Face API key from the environment variables
const apiKey = process.env.my_api_key;

if (!apiKey) {
    console.error('API key is missing! Please set my_api_key in the environment variables.');
    process.exit(1);  // Exit if API key is missing
}

// API route for handling chatbot requests
app.post('/message', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: 'Message is required' });  // Handle missing message
    }

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
            { inputs: userMessage },
            {
                headers: { Authorization: `Bearer ${apiKey}` },
            }
        );

        const botMessage = response.data.generated_text || "Sorry, I couldn't generate a response.";
        res.json({ reply: botMessage });
    } catch (error) {
        console.error('Error during API call to Hugging Face:', error.message);
        if (error.response) {
            console.error('Hugging Face API response:', error.response.data);
        }
        res.status(500).json({ error: 'Error generating response from Hugging Face API' });
    }
});

// Route to serve chatbot HTML
app.get('/chatbot', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chatbot.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
