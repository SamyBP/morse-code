const express = require('express')
const guessRepository = require('../../db/guess')
const router = express.Router()

router.post('/', async (request, response) => {
    console.log(`${request.method} ${request.originalUrl} : ${JSON.stringify(request.body)}`);
    const { wordId, isCorrect, value } = request.body;
    const guess = await guessRepository.save(wordId, isCorrect, value);
    return response.status(200).json(guess);
})

function calculateMostMissedLetters(guesses, limit) {
    const misses = {};

    guesses.forEach(guess => {
        const actual = guess.actual.toUpperCase();
        const guessed = guess.guessed.toUpperCase();
        for (let i = 0; i < actual.length; i++) {
            if (actual[i] !== guessed[i]) {
                misses[actual[i]] = (misses[actual[i]] || 0) + 1;
            }
        }
    })

    return Object.entries(misses)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([letter, count]) => ({ letter, count }));
}

router.get('/statistics', async (request, response) => {
    console.log(`${request.method} ${request.originalUrl}`);
    const mostWrongGuessedWords = await guessRepository.findTopGuessesByStatus(3, false);
    const guessCounts = await guessRepository.getCountPerStatus();
    const letterMisses = await guessRepository.getAllByStatus(false);
    const data = {
        mostWrongGuessedWords: mostWrongGuessedWords,
        guessCounts: guessCounts,
        mostMissedLetters: calculateMostMissedLetters(letterMisses, 5)
    }
    return response.status(200).json(data);
});


router.get('/journey', async (request, response) => {
    console.log(`${request.method} ${request.originalUrl}`);
    const accuracy = await guessRepository.getGuessAcurracyOverTime();
    return response.status(200).json(accuracy);
});

module.exports = router