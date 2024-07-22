document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const chatWidget = document.getElementById('chat-widget'); // Переменная объявлена здесь
    const minimizeButton = document.getElementById('minimize-button');

    if (!chatWidget) {
        console.error('Элемент с ID chat-widget не найден.');
        return;
    }

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    minimizeButton.addEventListener('click', function() {
        chatWidget.classList.toggle('minimized');
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
        fetch('https://coconut-mica-diplodocus.glitch.me/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response data:', data); // Для отладки
            if (data.response) {
                appendMessage(data.response, 'bot-message');
            } else {
                appendMessage('Не удалось получить ответ от бота.', 'bot-message');
            }
        })
        .catch(error => {
            console.error('Ошибка при получении ответа от бота:', error);
            appendMessage('Произошла ошибка при запросе.', 'bot-message');
        });
    }

    // Добавляем анимацию через 5 секунд
    setTimeout(function() {
        chatWidget.classList.add('show');
    }, 5000); // 5 секунд задержки
});
