const pool = require('../utils/connMySql2')

const findAll = async()=>{
    const result = await pool.query('SELECT * from users ORDER BY id desc limit 10');
    console.log(result)
    return result
}

const findById = async(id)=>{
    const result = await pool.query('SELECT * from users WHERE id='+id)
    console.log(result)
    return result
}

const findOne = async(username)=>{
    const result = await pool.query('SELECT * from users WHERE username='+username)
    console.log(result)
    return result
}

module.exports = {
    findAll,
    findById,
    findOne
}