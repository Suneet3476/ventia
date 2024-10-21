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
  const userMessage = userInput.value.trim();

  if (userMessage !== "") {
    addMessage(userMessage, 'user-message');
    userInput.value = "";
    userInput.disabled = true;  // Disable input to prevent multiple requests
    userInput.focus();
    showTypingIndicator();

    try {
      const botResponse = await fetchBotResponse(userMessage);
      removeTypingIndicator();
      addMessage(botResponse, 'bot-message');
    } catch (error) {
      removeTypingIndicator();
      console.error('Error sending message:', error);
      addMessage("Sorry, I couldn't reach the server. Please try again later.", 'bot-message');
    } finally {
      userInput.disabled = false;  // Re-enable input after response
      userInput.focus();
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
  chatBox.scrollTop = chatBox.scrollHeight;

  // Add animation for new message
  setTimeout(() => {
    messageElement.style.opacity = '1';
    messageElement.style.transform = 'translateY(0)';
  }, 100);
}

function showTypingIndicator() {
  let typingIndicator = document.querySelector('.typing-indicator');
  if (!typingIndicator) {
    typingIndicator = document.createElement('div');
    typingIndicator.classList.add('message', 'bot-message', 'typing-indicator');
    typingIndicator.innerHTML = `<p>Typing...</p>`;
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

function removeTypingIndicator() {
  const typingIndicator = document.querySelector('.typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

async function fetchBotResponse(userMessage) {
  try {
    const response = await fetch('/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });

    if (!response.ok) {
      throw new Error(`Server returned an error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Check if reply exists in the response
    if (!data.reply) {
      throw new Error('No "reply" field in the response');
    }

    return data.reply;
  } catch (error) {
    console.error("Error fetching bot response:", error);
    // More specific error messages for better user feedback
    if (error.message.includes('Failed to fetch')) {
      return "Failed to connect to the server. Please check your internet connection.";
    } else if (error.message.includes('500')) {
      return "The server encountered an error. Please try again later.";
    } else {
      return "Sorry, something went wrong.";
    }
  }
}
