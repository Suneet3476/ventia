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

    if (response.data.generated_text) {
      const botMessage = response.data.generated_text;
      return res.json({ reply: botMessage });
    } else {
      console.error('Model did not return expected data:', response.data);
      return res.status(500).json({ error: 'No response from model' });
    }
  } catch (error) {
    console.error('Error during API call to Hugging Face:', error.message);
    console.error('Full error details:', error.response ? error.response.data : error);
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
