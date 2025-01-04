const pool = require('./pool')

const saveWord = async (word) => {
    const result = await pool.query('insert into word (value) values ($1) returning *', [word]);
    return result.rows[0]
}

const getRandomWord = async () => {
    const result = await pool.query('select * from word order by random() limit 1');
    return result.rows[0];
}

const wordsRepository = {
    save: saveWord,
    findRandomWord: getRandomWord
}

module.exports = wordsRepository