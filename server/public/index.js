document.getElementById('load-words').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/words');
        if (response.ok) {
            const words = await response.json();
            const wordsList = document.getElementById('words-list');
            wordsList.innerHTML = '';
            words.forEach(word => {
                console.log(word);
                const li = document.createElement('li');
                li.textContent = word.value;
                wordsList.appendChild(li);
            });
        } else {
            console.error('Failed to fetch words');
        }
    } catch (error) {
        console.error('Error fetching words:', error);
    }
});
