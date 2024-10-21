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
    if (!data.reply) {
      throw new Error('No "reply" field in the response');
    }

    return data.reply;
  } catch (error) {
    console.error("Error fetching bot response:", error);
    return "Sorry, something went wrong.";
  }
}
