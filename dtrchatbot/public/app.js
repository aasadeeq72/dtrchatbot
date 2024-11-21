const chatForm = document.getElementById('chat-form');
const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');

chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const message = userInput.value.trim();
  if (!message) return;

  // Add user message to chat history
  addMessage('user', message);
  userInput.value = '';

  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput: message }),
    });

    const data = await response.json();
    addMessage('bot', data.response || 'Sorry, I couldn\'t understand that.');
  } catch (error) {
    console.error('Error:', error);
    addMessage('bot', 'There was an error processing your request.');
  }
});

function addMessage(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
  messageDiv.textContent = text;
  chatHistory.appendChild(messageDiv);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}
