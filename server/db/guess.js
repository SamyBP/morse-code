const pool = require('./pool')

const saveGuess = async (wordId, isCorrect, value) => {
    const sql = `
        insert into guess (word_id, is_correct, value) values ($1, $2, $3) returning *
    `;
    const result = await pool.query(sql, [wordId, isCorrect, value])
    return result.rows[0]; 
}


const getTopGuessesByStatus = async (limit, status) => {
    const sql = `
        select 
            w.value, count(*) as count
        from guess g
        join word w on g.word_id = w.id
        where g.is_correct = $1 
        group by w.value 
        order by count desc 
        limit $2
    `;
    const result = await pool.query(sql, [status, limit]);
    return result.rows;
}

const getCountPerStatus = async () => {
    const sql = `
        select 
            sum(case when is_correct then 1 else 0 end) as correct,
            sum(case when not is_correct then 1 else 0 end) as wrong
        from guess;
    `;
    const result = await pool.query(sql);
    return result.rows[0];
}

const getGuessAcurracyOverTime = async () => {
    const sql = `
        select 
            date(placed_at) as date,
            round(sum(case when is_correct = true then 1 else 0 end) * 100.0 / count(*), 2) AS accuracy
        from guess
        group by date(placed_at)
        order by date;
    `;
    const result = await pool.query(sql);
    return result.rows;
}

const getAllByStatus = async (status) => {
    const sql = `
       select
            g.id as guess_id,
            w.value as actual,
            g.value as guessed
        from guess g
        join word w on g.word_id = w.id
        where g.is_correct = $1
    `;
    const result = await pool.query(sql, [status])
    return result.rows;
}

const guessRepository = {
    save: saveGuess,
    findTopGuessesByStatus: getTopGuessesByStatus,
    getCountPerStatus: getCountPerStatus,
    getGuessAcurracyOverTime: getGuessAcurracyOverTime,
    getAllByStatus: getAllByStatus
}

module.exports = guessRepository