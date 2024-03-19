const pool = require('../utils/connMySql2')

const findById = async(id)=>{
    const result = await pool.query('SELECT * from chats WHERE iduser1="'+id+'" OR iduser2="'+id+'"')
    console.log(result)
    return result
}

const create = async({iduser1, iduser2, content})=>{
    const result = await pool.query(
        `INSERT INTO chats(iduser1, iduser2, content) VALUES('${iduser1}','${iduser2}','${content}')`
    );
    return result
}
const update = async({idchats, content})=>{
    const result = await pool.query(
        'UPDATE chats SET content="'+content+'" WHERE idchats="'+idchats+'"'
    );
    return result
}

module.exports = {
    findById,
    create,
    update
}