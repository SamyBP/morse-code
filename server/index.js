const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const router = require('./api/words')

const app = express()
const PORT = 3000;

app.use(express.json())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/words', router)

app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
})