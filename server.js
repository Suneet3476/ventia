const express = require('express');
const axios = require('axios');
const path = require('path'); 
const cors = require('cors'); // Add CORS

const app = express();

// Use CORS to allow cross-origin requests
app.use(cors());

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Access the Hugging Face API key from Render environment variable
const apiKey = process.env.my_api_key;

// API route for handling chatbot requests
app.post('/message', async (req, res) => {
    const userMessage = req.body.message;

    // Log the received message for debugging
    console.log("Received user message:", userMessage);

    if (!userMessage) {
        return res.status(400).json({ error: 'No message provided' });
    }

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
            { inputs: userMessage },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );

        // Check if the response contains the expected data
        if (response.data && response.data.generated_text) {
            const botMessage = response.data.generated_text;
            console.log("Bot reply:", botMessage);
            res.json({ reply: botMessage });
        } else {
            console.error("No generated_text found in the response");
            res.json({ reply: "I'm sorry. I didn't understand that." });
        }
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
