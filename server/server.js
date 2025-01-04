require('dotenv').config();

const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const WebSocket = require('ws');
const router = require('./api/words/index')


const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', (ws) => {
    console.log('New websocket connection established on port 8080');

    ws.on('message', (message) => {
        console.log('socket received message:', message.toString());
        
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
app.use('/api/words', router);

app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
})