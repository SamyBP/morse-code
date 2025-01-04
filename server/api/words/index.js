const express = require('express')
const wordsRepository = require('../../db/words');

const router = express.Router();

function sendErrorResponse(response, statusCode, body) {
    console.error(body);
    return response.status(statusCode).json(body);
}

router.get('/', async (request, response) => {
    console.log(`${request.method} ${request.originalUrl}`)
    try {
        const randomWord = await wordsRepository.findRandomWord();
        if (!randomWord) {
            return sendErrorResponse(response, 404, {
                status: 404,
                message: 'could not find a random word'
            });
        }
        return response.status(200).json(randomWord);
    } catch (error) {
        return sendErrorResponse(response, 500, {
            status: 500,
            message: error.message
        });
    }
})

module.exports = router;