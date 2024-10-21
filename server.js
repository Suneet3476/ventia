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

// Helper function to wait for a specified amount of time
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// API route for handling chatbot requests
app.post('/message', async (req, res) => {
    const userMessage = req.body.message;

    console.log("Received user message:", userMessage);

    if (!userMessage) {
        return res.status(400).json({ error: 'No message provided' });
    }

    try {
        const maxRetries = 3;
        let retryCount = 0;

        while (retryCount < maxRetries) {
            for await (const chunk of hf.chatCompletionStream({
                model: 'microsoft/DialoGPT-medium',
                messages: [{ role: 'user', content: userMessage }],
                max_tokens: 500,
            })) {
                const botMessage = chunk.choices[0]?.delta?.content || "";

                if (botMessage) {
                    console.log("Bot reply:", botMessage);
                    return res.json({ reply: botMessage });
                }
            }

            if (retryCount < maxRetries) {
                console.log(`Retrying... (${retryCount + 1})`);
                retryCount++;
                await wait(5000); // Wait 5 seconds before retrying
            }
        }

        res.json({ reply: "The bot is currently loading. Please try again later." });
    } catch (error) {
        console.error('Error during API call to Hugging Face:', error.message);
        res.status(500).send('Error generating response from Hugging Face API.');
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
