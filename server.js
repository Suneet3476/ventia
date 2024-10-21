const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Access the Hugging Face API key from the environment variable
const apiKey = process.env.my_api_key;

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

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
