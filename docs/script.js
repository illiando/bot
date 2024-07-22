document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = userInput.value.trim();
        if (messageText) {
            appendMessage(messageText, 'user-message');
            userInput.value = '';
            fetchBotResponse(messageText);
        }
    }

    function appendMessage(text, className) {
        const message = document.createElement('div');
        message.className = `message ${className}`;
        message.textContent = text;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function fetchBotResponse(userMessage) {
        fetch('https://coconut-mica-diplodocus.glitch.me', {  // Замените на ваш URL Glitch
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            appendMessage(data.response, 'bot-message');
        })
        .catch(error => {
            console.error('Ошибка при получении ответа от бота:', error);
        });
    }
});
