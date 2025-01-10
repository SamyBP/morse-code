const generateWordButton = document.getElementById('generate-word-btn');
const randomWordDisplay = document.getElementById('word-display');
const guessStatusDisplay = document.getElementById('guess-status-display');
const snackbar = document.getElementById('snackbar');
const socket = new WebSocket('ws://localhost:8080');

generateWordButton.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/words');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(data));
        }

        localStorage.setItem('generatedWordId', data.id.toString());
        randomWordDisplay.textContent = data.value;
        generateWordButton.style.display = 'none';
        randomWordDisplay.classList.remove('hidden');

    } catch (error) {
        console.error(error.message);
        alert('Ran into an error while generating the word. Please try again later');
    }
});

function showSnackbar(message, backgroundColor) {
    snackbar.textContent = message;
    snackbar.className = 'show';
    snackbar.style.backgroundColor = backgroundColor || 'black';
    setTimeout(() => snackbar.className = snackbar.className.replace('show', ''), 3000);
}

socket.onmessage = (event) => {
    const wordToGues = randomWordDisplay.textContent
    const guessedWord = event.data;
    const wordId = Number.parseInt(localStorage.getItem('generatedWordId'));
    
    if (!wordId || !wordToGues) {
        console.warn("Need to generate a word first");
        return;
    }

    const isCorrect = wordToGues.toUpperCase() === guessedWord.toUpperCase();
    const guessStatus = isCorrect ? 'correct' : 'wrong, please try again'; 
    const backgroundColor = isCorrect ? '#04AA6D' : '#ED4337';
    showSnackbar(`Your guess is ${guessStatus}`, backgroundColor);

    const sendGuessToServer = async (id, flag) => {
        try {
            const response = await fetch('/api/guess', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({wordId: id, isCorrect: flag, value: guessedWord})
            })
    
            if (!response.ok) {
                throw new Error('Error when saving the guess to db');
            }
        } catch(error) {
            console.error(error.message);
        }
    }

    sendGuessToServer(wordId, isCorrect);
}