document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const messages = document.getElementById('messages');

    const apiKey = 'YOUR_API_KEY'; // Замените на ваш API ключ

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
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: message,
                max_tokens: 150
            })
        });
        const data = await response.json();
        const botResponse = data.choices[0].text.trim();
        addMessage(botResponse, 'bot-message');
    }
});
