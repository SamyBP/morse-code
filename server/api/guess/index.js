const express = require('express')
const guessRepository = require('../../db/guess')
const router = express.Router()

router.post('/', async (request, response) => {
    console.log(`${request.method} ${request.originalUrl} : ${JSON.stringify(request.body)}`);
    const { wordId, isCorrect, value } = request.body;
    const guess = await guessRepository.save(wordId, isCorrect, value);
    return response.status(200).json(guess);
})

router.get('/', async (request, response) => {
    console.log(`${request.method} ${request.originalUrl}`);
    const limit = request.query.limit || 3;
    const status = request.query.status || 'wrong';
    const guesses = await guessRepository.findTopGuessesByStatus(limit, status === 'wrong' ? false : true);
    return response.status(200).json(guesses);
})


router.get('/counts', async (request, response) => {
    console.log(`${request.method} ${request.originalUrl}`);
    const counts = await guessRepository.getCountPerStatus();
    return response.status(200).json(counts);
});

router.get('/accuracy', async (request, response) => {
    console.log(`${request.method} ${request.originalUrl}`);
    const accuracy = await guessRepository.getGuessAcurracyOverTime();
    return response.status(200).json(accuracy);
});

router.get('/letters', async (request, response) => {
    console.log(`${request.method} ${request.originalUrl}`);
    const guesses = await guessRepository.getAllByStatus(false);
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

    const data = Object.entries(misses)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([letter, count]) => ({ letter, count }));
    
    return response.status(200).json(data);
});

module.exports = router