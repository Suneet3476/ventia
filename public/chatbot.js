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
  const userMessage = userInput.value.trim().toLowerCase();  // Lowercase to make keyword detection easier
  
  if (userMessage !== "") {
    // Add user message to chat
    addMessage(userMessage, 'user-message');
    
    // Clear the input field
    userInput.value = "";
    userInput.focus(); // Refocus on input field for continuous typing
    
    // Show bot typing indicator
    showTypingIndicator();
    
    // Simulate bot response after delay based on user message
    setTimeout(() => {
      removeTypingIndicator();
      const botResponse = generateBotResponse(userMessage);
      addMessage(botResponse, 'bot-message');
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

// Function to generate bot response based on user input
function generateBotResponse(userMessage) {
  // Keywords categorized by emotion
  const positiveKeywords = ["happy", "excited", "good", "great", "joy", "hope", "motivated"];
  const negativeKeywords = ["sad", "depressed", "anxiety", "stressed", "overwhelmed", "angry"];
  const suicideKeywords = ["suicide", "i want to die", "kill myself", "die", "end my life", "kill"];
  const comfortingKeywords = ["alone", "lonely", "nobody cares", "worthless", "empty", "broken"];

  // Bot responses based on detected emotion/tone
  if (containsKeyword(userMessage, positiveKeywords)) {
    return "I'm glad to hear you're feeling good! Keep that positive energy flowing. 😊 What else would you like to talk about?";
  }
  
  if (containsKeyword(userMessage, negativeKeywords)) {
    return "I'm so sorry you're feeling this way. It's okay to feel down sometimes, but remember you're not alone. Talking about it might help. What would make things better for you right now?";
  }
  
  if (containsKeyword(userMessage, comfortingKeywords)) {
    return "It sounds like you're going through something tough, and I'm here for you. Sometimes sharing your feelings can make a world of difference. You are important, and your feelings matter. 💜";
  }

  if (containsKeyword(userMessage, suicideKeywords)) {
    return "Please, take care of yourself. I'm deeply concerned about your well-being. Help is available. I’m alerting emergency services right now. You're never alone. 🌟";
  }
  
  // Default response if no keywords matched
  return "Thank you for sharing. I’m here to listen and help. Is there anything else on your mind?";
}

// Helper function to detect if any keyword is present in the user message
function containsKeyword(message, keywordsArray) {
  return keywordsArray.some(keyword => message.includes(keyword));
}
