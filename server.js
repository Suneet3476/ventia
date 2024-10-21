const express = require('express');
const { HfInference } = require('@huggingface/inference');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Access the Hugging Face API key directly from the environment variable
const apiKey = process.env.my_api_key;

// Initialize Hugging Face Inference client
const hf = new HfInference(apiKey);

// API route for handling chatbot requests
app.post('/message', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: 'No message provided' });
    }

    try {
        // Use Hugging Face official library for the API call
        const result = await hf.chatCompletion({
            model: 'microsoft/DialoGPT-medium',
            inputs: userMessage
        });

        // Check if the response has the expected format
        if (result && result.generated_text) {
            const botMessage = result.generated_text;
            return res.json({ reply: botMessage });
        } else {
            console.error('Unexpected response format:', result);
            return res.status(500).json({ error: 'Unexpected response from Hugging Face API' });
        }

    } catch (error) {
        console.error('Error during API call to Hugging Face:', error.message);
        return res.status(500).send('Error generating response from Hugging Face API.');
    }
});

// Route for chatbot.html
app.get('/chatbot', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chatbot.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
