const pool = require('../utils/connMySql2')

const findAll = async()=>{
    const result = await pool.query('SELECT * from users ORDER BY idusers desc limit 10');
    return result
}

const findById = async(id)=>{
    const result = await pool.query('SELECT * from users WHERE idusers="'+id+'"')
    return result
}

const findOne = async(username)=>{
    const result = await pool.query('SELECT * from users WHERE username="'+username+'"')
    return result
}

module.exports = {
    findAll,
    findById,
    findOne
}