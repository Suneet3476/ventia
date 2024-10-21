const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const apiKey = 'your-huggingface-api-key'; // Replace this with your actual Hugging Face API key.

app.post('/message', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', // Using DialoGPT-medium model.
            {
                inputs: userMessage,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );

        const botMessage = response.data.generated_text || "I'm sorry. I'm facing server errors currently... but please don't worry, I'll be back soon!"; // Fallback message if no response.
        res.json({ reply: botMessage });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating response');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
