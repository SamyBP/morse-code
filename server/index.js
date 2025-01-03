require('dotenv').config();

const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const wordsRepository = require('./db/words');
const WebSocket = require('ws');


const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', (ws) => {
    console.log('New websocket connection established on port 8080');

    ws.on('message', (message) => {
        console.log('Received message:', message.toString());

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        })
    })
})


const app = express();
const PORT = 3000;

app.use(express.json())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

const socket = new WebSocket('ws://localhost:8080');

app.post('/api/words', async (request, response) => {
    try {
        const {value} = request.body;
        console.log(`POST /api/words "value": ${value}`)

        if (!value){
            const errorResponse = {
                status: 400,
                message: 'Invalid body, "value" is required'
            }
            console.error(errorResponse);
            return response.status(400).json(errorResponse);
        }

        const word = await wordsRepository.save(value);
        socket.send(JSON.stringify(word));
        console.log(`Sending response: ${word}`)
        return response.status(200).json(word);

    } catch (error) {
        const errorResponse = {
            status: 400,
            message: error.message
        }
        console.error(errorResponse);
        return response.status(400).json(errorResponse);
    }
})

app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
})