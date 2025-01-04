const generateWordButton = document.getElementById('generate-word-btn');
const randomWordDisplay = document.getElementById('word-display');
const guessStatusDisplay = document.getElementById('guess-status-display');
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

socket.onmessage = (event) => {
    const wordToGues = randomWordDisplay.textContent
    const guessedWord = event.data;
    const wordId = Number.parseInt(localStorage.getItem('generatedWordId'));
    
    if (!wordId || !wordToGues) {
        console.warn("Need to generate a word first");
        return;
    }

    const isCorrect = wordToGues.toUpperCase() === guessedWord.toUpperCase();
    const guessStatus = isCorrect ? 'correct' : 'wrong'; 
    guessStatusDisplay.textContent = `Your guess is ${guessStatus}`;
    guessStatusDisplay.classList.remove('hidden');
    guessStatusDisplay.classList.add(guessStatus);
    console.log(`Your guess is ${guessStatus}`);

    const sendGuessToServer = async (id, flag) => {
        try {
            const response = await fetch('/api/guess', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({wordId: id, isCorrect: flag})
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