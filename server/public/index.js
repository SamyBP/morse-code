const words = document.getElementById('words-list');

const socket = new WebSocket(`ws://localhost:8080`);

socket.onmessage = (event) => {
    console.log('hello');
    const word = event.data;
    const li = document.createElement('li');
    li.textContent = word;
    words.appendChild(li);
}