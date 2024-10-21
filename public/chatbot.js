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
    
    // Get bot response from your backend
    try {
      const botResponse = await fetchBotResponse(userMessage); // Fetch bot response
      removeTypingIndicator();
      addMessage(botResponse, 'bot-message');
    } catch (error) {
      removeTypingIndicator();
      console.error('Error sending message:', error); // Log more details
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
  let typingIndicator = document.querySelector('.typing-indicator');
  
  if (!typingIndicator) {  // Ensure we don't create duplicate indicators
    typingIndicator = document.createElement('div');
    typingIndicator.classList.add('message', 'bot-message', 'typing-indicator');
    typingIndicator.innerHTML = `
      <p>Typing...</p>
    `;
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
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

// Function to call your backend and get the chatbot's response
async function fetchBotResponse(userMessage) {
  try {
    const response = await fetch('/message', {  // Updated endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userMessage })
    });

    if (!response.ok) {
      throw new Error(`Server returned an error: ${response.status} ${response.statusText}`);  // More detailed error
    }

    const data = await response.json();
    
    if (!data.reply) {
      throw new Error('No reply in response');
    }
    
    return data.reply;  // Changed to expect 'reply' instead of 'botMessage'
  } catch (error) {
    console.error("Error fetching bot response:", error);
    return "Sorry, something went wrong.";
  }
}
