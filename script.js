document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');
    const log = document.getElementById('chat-log');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const message = input.value.trim();
        if (message !== '') {
            appendMessage(message, 'user');
            sendMessage(message);
            input.value = '';
        }
    });

    function appendMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageElement.textContent = message;
        log.appendChild(messageElement);
    }

    function sendMessage(message) {
        fetch('http://127.0.0.1:5000/api/chat', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        })
        .then(response => response.json())
        .then(data => {
            appendMessage(data.response, 'bot');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
