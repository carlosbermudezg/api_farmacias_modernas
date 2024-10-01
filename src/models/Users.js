const pool = require('../utils/connMySql2');
const { sendMail } = require('../utils/sendMail');

const findAll = async(limit, offset, search)=>{
    const result = await pool.query('SELECT idusers, name, username, type, active, telefono, direccion, residencia, zones, brands from users WHERE name LIKE ? OR username LIKE ? limit ? offset ?',[`%${search}%`, `%${search}%`, +limit, +offset]);
    return result
}

const countUsers = async(search)=>{
    const result = await pool.query('SELECT count(*) as count from users WHERE name LIKE ? OR username LIKE ?', [`%${search}%`, `%${search}%`]);
    return result
}

const findById = async(id)=>{
    const result = await pool.query('SELECT idusers, name, username, type, active, telefono, direccion, residencia from users WHERE idusers="'+id+'"')
    return result
}


const findDoctors = async()=>{
    const result = await pool.query('SELECT idusers, name, username from users WHERE type=1')
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

const create = async({name, username, password, type, telefono, direccion, residencia, brands, zones})=>{
    const review = await findOne(username)
    console.log(review[0][0])
    if(review[0][0] === undefined){
        const result = await pool.query(
            `INSERT INTO users(name, username, password, telefono, direccion, residencia, type, zones, brands) VALUES('${name}','${username}','${password}','${telefono}','${direccion}','${residencia}','${type}','${zones}','${brands}')`
        )
        const data = {
            destiny: username
        }
        sendMail()
        return result
    }else{
        return false
    }
}

const update = async(data) => {
    const result = await pool.query(
        `UPDATE users SET name='${data.name}', username='${data.username}', telefono='${data.telefono}', direccion='${data.direccion}', residencia='${data.ciudad}', type='${data.type}', zones='${data.zones}', brands='${data.brands}' WHERE idusers=${data.id}`
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
    update,
    findDoctors,
    countUsers
}