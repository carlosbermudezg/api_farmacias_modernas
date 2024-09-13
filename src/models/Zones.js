const pool = require('../utils/connMySql2')

const findAll = async()=>{
    const result = await pool.query('SELECT * from zones');
    return result
}

const findById = async(id)=>{
    const result = await pool.query('SELECT * from zones WHERE idzonas="'+id+'"')
    return result
}
const getAllMyZones = async(zones)=>{
    const result = await pool.query('SELECT * from zones WHERE idzonas IN ' + zones)
    return result
}

const create = async({name})=>{
    const result = await pool.query(
        `INSERT INTO zones(name) VALUES('${name}')`
    )
    return result
}

const update = async(data) => {
    const result = await pool.query(
        `UPDATE zones SET name='${data.name}' WHERE idzonas=${data.id}`
    )
    return result
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    getAllMyZones
}