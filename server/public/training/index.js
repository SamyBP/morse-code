const submitButton = document.getElementById("submit");
const wordToSend = document.getElementById("word");
const encodedWordDisplay = document.getElementById("word-display");
const socket = new WebSocket("ws://localhost:8080");

function sendWordThroughWebsocket(word, socket) {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.error("WebSocket is not open or connected");
        return;
    }

    socket.send(`encode:${word}`);
}

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const word = wordToSend.value;
    sendWordThroughWebsocket(word, socket);
})

socket.onmessage = (event) => {
    const message = event.data;
    if (message.startsWith("result:")) {
        const encoded = message.slice(7);
        encodedWordDisplay.innerHTML = '';
        encoded.split(' ').forEach(encodedLetter => {
            const letterBox = document.createElement('div');
            letterBox.className = 'letter-box';
            letterBox.textContent = encodedLetter;
            encodedWordDisplay.appendChild(letterBox);
        });
        encodedWordDisplay.classList.remove('hidden');
    }
}
