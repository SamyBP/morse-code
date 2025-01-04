# morse-code

A simple game where the user enters recieves a random word and provides the morse code enryption of that word.

## Components

The application uses an arduino ESP32 to take the user input and decode it into natural language, an http server used to interact with a database and serve the static files of the game and a websocket server.

The arduino and the web client both connect to the websocket in order to achieve real time updates of the guesses sent by the arduino

## Flow

The user clicks on the **get random word** button he sees in the browser, that triggers a GET request on the server, the server responds with a word and the ui is updated

The user enters the morse code encoding of that word in the arduino, the sequence is than decoded and send through,when that happens the client updates the ui displaying wheter the guess was correct or not, and makes a POST request to the server in order to persist the guess and provide some statistics later on

## Usage

Follow the installation steps from both the [server](/server/readme.md) and [arduino](/arduino/readme.md)

Before compiling and uploading the code on the arduino board start the websocket server and the http server (the order does not matter)