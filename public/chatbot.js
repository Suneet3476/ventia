// Get elements
const sendButton = document.getElementById('send-button');
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

// Function to handle sending messages
sendButton.addEventListener('click', () => {
  const userMessage = userInput.value.trim();
  
  if (userMessage !== "") {
    // Add user message to chat
    addMessage(userMessage, 'user-message');
    
    // Clear the input field
    userInput.value = "";
    
    // Simulate bot response after delay
    setTimeout(() => {
      addMessage("Thanks for your input! What else can I assist you with?", 'bot-message');
    }, 1000);
  }
});

function addMessage(text, className) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', className);
  messageElement.innerHTML = `
    <p>${text}</p>
    <span class="message-time">${getTime()}</span>
  `;
  
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto scroll to bottom
}

// Function to get current time
function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
