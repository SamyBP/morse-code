## Setup

Install the required dependencies:

    >> npm install

## Server

To start the server you can run:

    >> npm start

or 

    >> npm run dev

This will restart the server if any modifications were done to the source files 

### API

The server handles the following:

    POST /api/guess
    Content-Type: 'application/json'
    Body: 
        {
            "wordId": int,
            "isCorrect": bool
        }
    Description: saves a guess to db

    GET /api/words 
    Description: retrieves a random word from db 
    Example response:
        {
            "id": int,
            "value" string,
            "createdAt": timestamp
        }

The server also serves the static files from the [public](/public) directory, that represents the Game's UI

## WebSocket Server

To start the server you can run:

    >> npm run start:ws

or 

    >> npm run dev:ws

This will restart the server if any modifications were done to the source files

Used to establish a connection between the arduino and the web client for real time word/guess updates