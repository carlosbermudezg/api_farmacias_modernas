const { pool } = require('../utils/connMySql2')

const findAll = async()=>{
    const result = await pool.query('SELECT * from years ORDER BY idyear desc');
    return result
}

module.exports = {
    findAll
}