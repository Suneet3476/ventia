const express = require('express');
const axios = require('axios');
const path = require('path');  // Import path to serve static files

const app = express();
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Access the Hugging Face API key from the environment variable
const apiKey = process.env.my_api_key;

// API route for handling chatbot requests
app.post('/message', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', // Using DialoGPT-medium model
            {
                inputs: userMessage,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,  // Use the environment variable here
                },
            }
        );

        const botMessage = response.data.generated_text || "I'm sorry. I'm facing server errors currently... but please don't worry, I'll be back soon!"; // Fallback message
        res.json({ reply: botMessage });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating response');
    }
});

// Route for chatbot.html (optional, if you want a specific route for chatbot page)
app.get('/chatbot', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chatbot.html'));  // Serving chatbot.html directly
});

// Start the server
const port = process.env.PORT || 3000;  // Use PORT if available, or default to 3000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
