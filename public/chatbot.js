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

function sendMessage() {
  const userMessage = userInput.value.trim();
  
  if (userMessage !== "") {
    // Add user message to chat
    addMessage(userMessage, 'user-message');
    
    // Clear the input field
    userInput.value = "";
    userInput.focus(); // Refocus on input field for continuous typing
    
    // Show bot typing indicator
    showTypingIndicator();
    
    // Simulate bot response after delay
    setTimeout(() => {
      removeTypingIndicator();
      addMessage("Thanks for your input! What else can I assist you with?", 'bot-message');
    }, 1500);
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
