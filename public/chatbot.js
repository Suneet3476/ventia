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

// Define your Hugging Face API token and model
const API_TOKEN = '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'; 
const API_URL = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';

async function sendMessageToAPI(message) {
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

  const data = await response.json();
  return data.generated_text;
}

function displayMessage(message, sender) {
  const chatBox = document.getElementById('chat-box');
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat-message', sender);
  messageElement.innerText = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
}

document.getElementById('send-button').addEventListener('click', async function () {
  const userInput = document.getElementById('user-input');
  const message = userInput.value.trim();

  if (message !== '') {
    // Display user message
    displayMessage(message, 'user');
    userInput.value = '';

    // Send user message to API and get response
    const botResponse = await sendMessageToAPI(message);

    // Display bot response
    displayMessage(botResponse, 'bot');
  }
});

document.getElementById('user-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    document.getElementById('send-button').click();
  }
});


// Function to get current time
function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
