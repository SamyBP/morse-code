const pool = require('./pool')

const saveGuess = async (wordId, isCorrect) => {
    const result = await pool.query('insert into guess (word_id, is_correct) values ($1, $2) returning *', [wordId, isCorrect])
    return result.rows[0]; 
}


const guessRepository = {
    save: saveGuess
}

module.exports = guessRepository