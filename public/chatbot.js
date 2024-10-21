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

async function sendMessage() {
  const userMessage = userInput.value.trim();  // Keeping user message case-sensitive for natural interaction
  
  if (userMessage !== "") {
    // Add user message to chat
    addMessage(userMessage, 'user-message');
    
    // Clear the input field
    userInput.value = "";
    userInput.focus(); // Refocus on input field for continuous typing
    
    // Show bot typing indicator
    showTypingIndicator();
    
    // Get bot response from OpenAI API
    try {
      const botResponse = await fetchOpenAIResponse(userMessage); // Call OpenAI's API to get response
      removeTypingIndicator();
      addMessage(botResponse, 'bot-message');
    } catch (error) {
      removeTypingIndicator();
      addMessage("Sorry, I couldn't reach the server. Please try again later.", 'bot-message');
    }
  }
}

function addMessage(text, className) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', className);
  messageElement.innerHTML = `
    <p>${text}</p>
    <span class="message-time">${getTime()}</span>
  `;
  
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto scroll to bottom
  
  // Delay adding the class for animation
  setTimeout(() => {
    messageElement.style.opacity = '1';
    messageElement.style.transform = 'translateY(0)';
  }, 100); // Small delay for smooth fade-in
}

// Function to show bot typing indicator
function showTypingIndicator() {
  const typingIndicator = document.createElement('div');
  typingIndicator.classList.add('message', 'bot-message', 'typing-indicator');
  typingIndicator.innerHTML = `
    <p>Typing...</p>
  `;
  chatBox.appendChild(typingIndicator);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to remove bot typing indicator
function removeTypingIndicator() {
  const typingIndicator = document.querySelector('.typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Function to get current time
function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Function to call OpenAI API and get the chatbot's response
async function fetchOpenAIResponse(userMessage) {
  const apiKey = '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'; // Replace with your actual OpenAI API key
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo', // You can change this if needed
      messages: [{ role: 'user', content: userMessage }],
      max_tokens: 150 // Adjust as per the length of the response you expect
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
