const express = require('express')
const wordsRepository = require('../../db/words');
const WebSocket = require('ws')

const router = express.Router();
const socket = new WebSocket('ws://localhost:8080');

function sendErrorResponse(response, statusCode, body) {
    console.error(body);
    return response.status(statusCode).json(body);
}

router.post('/', async (request, response) => {
    try {
        console.log(`${request.method} ${request.originalUrl} : ${JSON.stringify(request.body)}`);
        const { value } = request.body

        if (!value){
            return sendErrorResponse(response, 400, {
                status: 400,
                message: 'Invalid body, "value" is required'
            });
        }

        const word = await wordsRepository.save(value);
        socket.send(word.value);
        
        console.log(`Sending response: ${JSON.stringify(word)}`)
        return response.status(200).json(word);
    } catch (error) {
        return sendErrorResponse(response, 500, {
            status: 500,
            message: error.message
        });
    }
})

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