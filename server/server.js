require('dotenv').config();

const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const wordsRouter = require('./api/words/index')
const guessRouter = require('./api/guess/index')

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/words', wordsRouter);
app.use('/api/guess', guessRouter);

app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
})