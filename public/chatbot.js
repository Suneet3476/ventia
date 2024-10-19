// Get elements
const sendButton = document.getElementById('send-button');
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

// Add event listener for 'Enter' key press
userInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Function to handle sending messages
sendButton.addEventListener('click', sendMessage);

// Define your Hugging Face API token and model URL
const API_TOKEN = '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'; 
const API_URL = 'https://api-inference.huggingface.co/models/distilgpt2';

// Send message to Hugging Face API
async function sendMessageToAPI(message) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: {
          text: message
        }
      })
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.generated_text || 'Sorry, I am having trouble responding right now.';
  } catch (error) {
    console.error('Error:', error);
    return 'Something went wrong. Please try again later.';
  }
}

// Function to display messages in the chat
function displayMessage(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat-message', sender);
  messageElement.innerText = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
}

// Main function to send messages
async function sendMessage() {
  const message = userInput.value.trim();

  if (message !== '') {
    // Display user message
    displayMessage(message, 'user');
    userInput.value = '';

    // Get bot response from the API
    const botResponse = await sendMessageToAPI(message);

    // Display bot response
    displayMessage(botResponse, 'bot');
  }
}

// Handle 'Enter' key press as an alternate send
document.getElementById('user-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    document.getElementById('send-button').click();
  }
});
