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

const findByProduct = async(search)=>{
    const result = await pool.query("SELECT * FROM users WHERE name LIKE ?", '%' + search + '%')
    console.log(result)
    return result
}

module.exports = {
    findAll,
    findById,
    findByProduct
}