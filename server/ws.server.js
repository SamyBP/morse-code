require('dotenv').config();
const WebSocket = require('ws');

const port = process.env.WS_SERVER_PORT || 8080;

const wss = new WebSocket.Server({ port: port })

wss.on('listening', () => {
    console.log(`Server listening on ${port}`);
})

wss.on('connection', (ws) => {
    console.log(`New websocket connection established`);

    ws.on('message', (message) => {
        console.log('socket received message:', message.toString());

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        })
    })

    ws.on('close', () => {
        console.log('A connection has closed');
    })
})
