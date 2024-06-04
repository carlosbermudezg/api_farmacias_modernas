const pool = require('../utils/connMySql2')

const findAll = async()=>{
    const result = await pool.query('SELECT idusers, name, username, type, active, telefono, direccion from users ORDER BY idusers desc limit 10');
    return result
}

const findById = async(id)=>{
    const result = await pool.query('SELECT idusers, name, username, type, active, telefono, direccion from users WHERE idusers="'+id+'"')
    return result
}

const findOne = async(username)=>{
    const result = await pool.query('SELECT * from users WHERE username="'+username+'"')
    return result
}

const findByUserSearch = async(search)=>{
    const result = await pool.query("SELECT idusers, name FROM users WHERE name LIKE '%"+search+"%'")
    return result
}

const changeStatus = async(id, status) => {
    const result = await pool.query(
        `UPDATE users SET active=${status} WHERE idusers=${id}`
    );
    return result
}

const create = async({name, username, password, type, telefono, direccion})=>{
    const result = await pool.query(
        `INSERT INTO users(name, username, password, telefono, direccion, type) VALUES('${name}','${username}','${password}','${telefono}','${direccion}','${type}')`
    );
    return result
}

const update = async(data) => {
    const result = await pool.query(
        `UPDATE users SET name='${data.name}', username='${data.username}', password='${data.password}', telefono='${data.telefono}', direccion='${data.direccion}', type='${data.type}' WHERE idusers=${data.id}`
    );
    return result
}

module.exports = {
    findAll,
    findById,
    findOne,
    create,
    changeStatus,
    findByUserSearch,
    update
}