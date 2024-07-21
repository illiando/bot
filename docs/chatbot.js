document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const messages = document.getElementById('messages');

    let knowledgeBase = {};

    // Загрузка базы знаний
    fetch('https://github.com/illiando/bot/blob/main/knowledge_base.json')
        .then(response => response.json())
        .then(data => {
            knowledgeBase = data;
        })
        .catch(error => {
            console.error('Ошибка загрузки базы знаний:', error);
        });

    sendButton.addEventListener('click', () => {
        const userText = userInput.value.trim();
        if (userText) {
            addMessage(userText, 'user-message');
            userInput.value = '';
            handleUserMessage(userText);
        }
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });

    function addMessage(text, className) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${className}`;
        messageElement.textContent = text;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight;
    }

    function handleUserMessage(message) {
        const lowercasedMessage = message.toLowerCase();
        const response = knowledgeBase[lowercasedMessage] || 'Извините, я не понимаю ваш запрос.';
        addMessage(response, 'bot-message');
    }
});
