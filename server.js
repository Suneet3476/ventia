const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Access the Hugging Face API key directly from the Render environment variable
const apiKey = process.env.my_api_key;

// Helper function to wait for a specified amount of time
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// API route for handling chatbot requests
app.post('/message', async (req, res) => {
    const userMessage = req.body.message;

    // Log the received message for debugging
    console.log("Received user message:", userMessage);

    if (!userMessage) {
        return res.status(400).json({ error: 'No message provided' });
    }

    try {
        let retryCount = 0;
        const maxRetries = 3; // Number of retries if the model is still loading

        while (retryCount < maxRetries) {
            const response = await axios.post(
                'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
                { inputs: userMessage },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                    },
                }
            );

            if (response.data.generated_text) {
                const botMessage = response.data.generated_text;
                console.log("Bot reply:", botMessage);
                return res.json({ reply: botMessage });
            } else if (response.data.error && response.data.error.includes('currently loading')) {
                console.log(`Model is loading, retrying in 5 seconds... (Attempt ${retryCount + 1})`);
                retryCount++;
                await wait(5000); // Wait 5 seconds before retrying
            } else {
                break;
            }
        }

        res.json({ reply: "The bot is currently loading. Please try again in a few moments." });
    } catch (error) {
        console.error('Error during API call to Hugging Face:', error.message);
        if (error.response) {
            console.error('Hugging Face API response:', error.response.data);
        }
        res.status(500).send('Error generating response from Hugging Face API.');
    }
});

// Route for chatbot.html (optional)
app.get('/chatbot', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chatbot.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
