const express = require('express');
const wordsRepository = require('../db/words');
const router = express.Router();

router.post('/', async (request, response) => {
    try {
        console.log(`POST api/words body: ${request.body}`)
        const { word } = request.body;
        const newWord = await wordsRepository.save(word);
        response.json(newWord);
    } catch(error) {
        response.status(500).json({ 
            status: 500,
            message: error.message
        });
    }
});

router.get('/', async (_, response) => {
    try {
        console.log('GET api/words')
        const words = await wordsRepository.findAll();
        response.json(words);
    } catch (error) {
        response.status(500).json({ 
            status: 500,
            message: error.message
        });
    }
});

module.exports = router;