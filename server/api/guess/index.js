const express = require('express')
const guessRepository = require('../../db/guess')
const router = express.Router()

router.post('/', async (request, response) => {
    console.log(`${request.method} ${request.originalUrl} : ${JSON.stringify(request.body)}`);
    const { wordId, isCorrect } = request.body;
    const guess = await guessRepository.save(wordId, isCorrect);
    return response.status(200).json(guess);
})

module.exports = router