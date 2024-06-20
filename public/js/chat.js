document.addEventListener('DOMContentLoaded', () => {
  const socket = io();
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatBox = document.getElementById('chat-box');

  chatForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = chatInput.value.trim();

    if (message) {
      // Append user's message to chat box
      appendMessage('You', message);
      chatInput.value = '';

      try {
        const response = await fetch('/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message })
        });

        const data = await response.json();
        if (data && data.response) {
          appendMessage('Agent', data.response);
        } else {
          appendMessage('System', 'No response from agent');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        appendMessage('System', 'Error sending message');
      }
    }
  });

  function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  socket.on('chat message', (data) => {
    appendMessage(data.user, data.message);
  });
});