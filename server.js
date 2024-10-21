const express = require('express');
const fetch = require('node-fetch'); // To make API requests
const cors = require('cors'); // To allow your frontend to communicate with this backend
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Allow all origins (you can restrict this to your frontend domain)

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle OpenAI API requests (for chatbot.html)
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message; // Get message from the request body

  try {
    const apiKey = process.env.OPENAI_API_KEY; // Use environment variable here
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
        max_tokens: 150
      })
    });

    const data = await response.json();
    res.json({ botMessage: data.choices[0].message.content }); // Send bot response back to frontend
  } catch (error) {
    res.status(500).json({ error: 'Failed to connect to OpenAI API' });
  }
});

// Catch-all route to serve chatbot.html when '/chatbot' is requested
app.get('/chatbot', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chatbot.html'));
});

// Start server (only needed for API calls)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
