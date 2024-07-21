document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const messages = document.getElementById('messages');

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

    async function handleUserMessage(message) {
        try {
            const response = await fetch('http://localhost:3000/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            addMessage(data.reply, 'bot-message');
        } catch (error) {
            console.error('Ошибка при обработке сообщения:', error);
        }
    }
});
