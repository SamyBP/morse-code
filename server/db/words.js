const pool = require('./pool')

const saveWord = async (word) => {
    const result = await pool.query('insert into words (value) values ($1) returning *', [word]);
    return result.rows[0]
}

const getAllWords = async () => {
    const result = await pool.query('select * from words order by created_at desc');
    return result.rows;
}

const wordsRepository = {
    save: saveWord,
    findAll: getAllWords
}

module.exports = wordsRepository